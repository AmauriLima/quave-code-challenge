import React from 'react';
import { useCommunities } from '../../contexts/communities-context';
import { Event } from '../event';
import { Home } from '../home';

export function Main() {
  const { selectedCommunityId } = useCommunities();

  if (!selectedCommunityId) return <Home />;

  return <Event />;
}
