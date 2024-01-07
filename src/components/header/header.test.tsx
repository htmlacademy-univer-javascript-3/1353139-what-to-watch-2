import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component.tsx';
import { makeFakeStore } from '../../utils/mocks.ts';
import { Header } from './header.tsx';
import { EAuthorizationStatus } from '../../constants.ts';

describe('Component Header', () => {
  it('Should render correctly when authorization status AUTH', () => {
    const expectedMyListText = 'My list';
    const expectedSignOutText = 'Sign out';
    const componentWithHistory = withHistory(<Header />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      auth: {
        authorizationStatus: EAuthorizationStatus.AUTH,
        user: null,
      }
    }));

    render(withStoreComponent);

    expect(screen.getByText(expectedMyListText)).toBeInTheDocument();
    expect(screen.getByText(expectedSignOutText)).toBeInTheDocument();
  });

  it('Should render correctly when authorization status NO_AUTH', () => {
    const expectedSignInText = 'Sign in';
    const componentWithHistory = withHistory(<Header />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      auth: {
        authorizationStatus: EAuthorizationStatus.NOAUTH,
        user: null,
      }
    }));

    render(withStoreComponent);

    expect(screen.getByText(expectedSignInText)).toBeInTheDocument();
  });

  it('Should render correctly when authorization status UNKNOWN', () => {
    const expectedSignInText = 'Sign in';
    const componentWithHistory = withHistory(<Header />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      auth: {
        authorizationStatus: EAuthorizationStatus.UNKNOWN,
        user: null,
      }
    }));

    render(withStoreComponent);

    expect(screen.getByText(expectedSignInText)).toBeInTheDocument();
  });
});
