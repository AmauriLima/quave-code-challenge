import { Communities } from '../../communities/communities';

export function publishCommunities() {
  return Communities.find({}, { fields: { name: 1 } });
}
