import { createGlobalState } from 'react-hooks-global-state';

export type UserRole = 'guest' | 'privileged' | 'admin';

type Store = {
  userRole: UserRole;
};

const { useGlobalState, setGlobalState } = createGlobalState<Store>({
  userRole: 'guest',
});

export { useGlobalState, setGlobalState };
