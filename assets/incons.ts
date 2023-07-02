import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faWarning } from '@fortawesome/free-solid-svg-icons';

library.add(faMailBulk, faLock, faEnvelope);

export default {
  email: faEnvelope,
  password: faLock,
  mail: faMailBulk,
  user: faUser,
  userPlus: faUserPlus,
  signInAlt: faSignInAlt,
  warning: faWarning


}