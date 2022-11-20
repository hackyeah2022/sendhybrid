import { createGlobalState } from 'react-hooks-global-state';

type Store = {
  userRole: 'guest' | 'privileged' | 'admin';
};

const { useGlobalState } = createGlobalState<Store>({ userRole: 'guest' });

export { useGlobalState };
