import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { arunoda, leo } from '../../../lib/data/team'
import { TerminalInput } from '../../../components/text/terminal'
import { Code } from '../../../components/text/code'
import { HR } from '../../../components/text/paragraph'
import Image from '../../../components/image'
import Now from '../../../components/now/now'

// prettier-ignore
export default withDoc({
  title: 'Five Minute Guide',
  date: '30 July 2017',
  authors: [arunoda, leo],
})(markdown(components)`

With ${<Now color="#000"/>}, you can deploy and publish any kind of web app (or service) in under five minutes. This guide includes information about:

* Deploying an app
* Buying a domain name
* Mapping that domain name to the app
* Configuring an SSL certificate

## Now Desktop

To use ${<Now color="#000"/>}, start by installing [Now Desktop](https://zeit.co/download).

When the installation is completed, you'll be asked to log in (or sign up) using your email address. Once that's done, you'll
be guided through a tutorial which contains a section for easily installing Now CLI.

After you've installed it, continue with the sections below (if the installation isn't working for some reason, there
are [several other ways](https://zeit.co/download#command-line) to install Now CLI).

## Deployment

Let's deploy a simple static web app.

As the first step, create a directory called \`my-web-app\` and add the following content to a file called \`index.html\`.

${<Code>{`<!DOCTYPE html>
<html>
  <body>
    This is a static web app.
  </body>
</html>`}</Code>}

> You can also use a [Node.js app](https://github.com/zeit/nextgram) or an [app with a Dockerfile](https://github.com/now-examples/cobol-hello-world) instead of this simple static app.

After you have added the content, visit the \`my-web-app\` directory using a terminal and run this command:

${<TerminalInput>now</TerminalInput>}

${<Now color="#000"/>} will deploy the app and give you a URL as shown below.

${<Image
  src={`${IMAGE_ASSETS_URL}/docs/five-minute-guide-to-now/deploy.png`}
  width={650}
  height={255}
  caption="Getting a unique URL after the deployment."
/>}

This is a URL for the current deployment of the app. You can access this version of the app anytime with this URL.

## Domain Name

Now you have a unique URL(<https://my-web-app-avvuiuuwto.now.sh>) for your app. But you probably want a nicer-sounding URL before directing your users there. The next step is to map the "now.sh" URL to a domain name that you prefer.

Let's assume the domain name is \`my-web-app.com\`, and you haven't bought it yet. <br/>
To map this domain name to the app's unique URL, run this command:

${<TerminalInput>now alias https://my-web-app-avvuiuuwto.now.sh my-web-app.com</TerminalInput>}

Since you haven't bought the domain name yet, you will be asked to enter your credit card information to buy it.
You can do that by running this command:

${<TerminalInput>now cc add</TerminalInput>}

You may choose to upgrade your account to the "Premium" plan by running this command:

${<TerminalInput>now upgrade</TerminalInput>}

Now, run the domain mapping command again and follow these instructions:

${<TerminalInput>now alias https://my-web-app-avvuiuuwto.now.sh my-web-app.com</TerminalInput>}

Once you've done that, you'll be able to access your app using <https://my-web-app.com>.
It is automatically configured with a [Let's Encrypt](https://letsencrypt.org/) SSL certificate and served with HTTPS.

${<Image
  src={`${IMAGE_ASSETS_URL}/docs/five-minute-guide-to-now/domain-setup.png`}
  width={650}
  height={412}
  caption="After mapping a domain name to a deployment."
/>}

## Updates

If you've made any changes to your app, you will need to deploy the latest version of your app. To do that, run this command:

${<TerminalInput>now</TerminalInput>}

You will receive a unique URL for this deployment. Let's assume that the new URL is <https://my-web-app-ttfxzqwbwz.now.sh>.

You can map this new URL to your domain name by running this command:

${<TerminalInput>now alias https://my-web-app-ttfxzqwbwz.now.sh my-web-app.com</TerminalInput>}

Now everything is ready.<br/>
Your users can access the updated web app at <https://my-web-app.com>.

${<HR />}

These are just a few things you can do with ${<Now color="#000"/>}. To learn more about ${<Now color="#000"/>}, simply follow the rest of the docs.
`)
