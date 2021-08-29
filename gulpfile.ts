import { deployKubernetes, configs } from '@massfice/sw-fairy-common-deploy-scripts';

const config = configs.kubernetes(
    __dirname,
    'https://9766b21f-9055-436e-a20a-8018422119a5.k8s.ondigitalocean.com',
    'sw-fairy-k8s-auth-api',
);

const deploy = deployKubernetes(config);

export { deploy };
