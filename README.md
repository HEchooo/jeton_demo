## Example Website

This is the sample URL after running the code. [demo.jetonai.com](http://demo.jetonai.com)

## Preparation Required

This project uses RainbowKit for wallet connection, so you need to apply for a project ID at  https://cloud.walletconnect.com/sign-in, However, if you just want to run it easily, we also provide a default project ID in `pages/walletconfig/rainbow.config.ts`.

## Getting Started

First, you need to install the packages. 

`npm install`

After the installation is complete, run the project. 

`npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can check the requested interfaces in `src/_yapi/index.ts`

## Apply For TenantId

If you wish to run your own project, you will need to apply for a `tenantId` and `tenantToken` via email. After the application is complete, replace the `tenantId` and `tenantToken` in `src/_yap/request.ts`, and then run the project again to complete the configuration.
The default provided tenantId and tenantToken restrict the number of requests to 10 times per minute.

**How to apply for a Tenant ID and Tenant Token?**

```
I would like to request a Tenant ID and Tenant Token for my company.

Company Name:             <Your Company's Name>
Email:                    <Contact Email Address, default is the current sending email address>
Purpose:                  <Briefly describe the usage scenario>
Request website domain:   <Optional, direct requests to the interface from the website do not need to include 														 tenantToken, to prevent tenantToken leakage. However, if using backend calls to the 														 interface, both tenantId and tenantToken must be included.>
```

You can use this template to send your email to  business@jetonai.com.



