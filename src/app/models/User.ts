import { Job } from './Job';

export interface User {
  username?: string;
  email?: string;
  focus?: string;
  savedJobs?: Job[];
}
