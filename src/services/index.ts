import profile from './profile/route';
import jobs from './scheduler-jobs/route';

export default [
    ...profile,
    ...jobs
];