import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { arunoda } from '../../../lib/data/team'
import { TerminalInput } from '../../../components/text/terminal'
import { Code } from '../../../components/text/code'
import { InternalLink } from '../../../components/text/link'
import Image from '../../../components/image'
import Now from '../../../components/now/now'

// prettier-ignore
export default withDoc({
  title: 'Secrets',
  date: '6 August 2017',
  authors: [arunoda],
})(markdown(components)`

If multiple people deploy your app or utilize a CI service, it's a better idea to use ${<InternalLink href="/docs/getting-started/environment-variables#via-“now.json”">now.json</InternalLink>} to expose environment variables. 

However, adding that file to [Git](https://en.wikipedia.org/wiki/Git) could cause potential issues. Secrets like API tokens and DB information are visible to anyone who has access to the source code. That's bad.

## Now Secrets

That's where ${<Now color="#000"/>} Secrets can help you. It's a configuration store that works across your account. Let's see how to use it:

First, add some secrets:

${<TerminalInput>{`now secrets add my-app-mongo-url "user:password@mydb.com"
now secrets add my-app-my-api-token "XXXXX"`}</TerminalInput>}

Then, you can get these values inside environment variables.<br/>
Here's how to do that with \`now.json\`:

${<Code>{`{
  "env": {
    "MONGO_URL": "@my-app-mongo-url",
    "MY_API_TOKEN": "@my-app-my-api-token"
  }
}`}</Code>}

That's it.

This \`now.json\` file no longer contains secret information and it's safe to add that to Git and share with anyone. Only the people who can deploy the app has access to these secrets.

## Operations

You can perform a few sets of operations with ${<Now color="#000"/>} Secrets, including adding, renaming and removing secrets. But you can't read secrets from the terminal.

> **WARNING**:
> <br/>
>Anyone who can deploy to ${<Now color="#000"/>} has access to these secrets. Disabling the ability to read secrets in the terminal is simply a barrier.
> <br/>
>A user can still deploy a simple app to dump these secrets.


You can get more information about ${<Now color="#000"/>} Secrets by running the following Help command:

${<TerminalInput>{`now secrets --help`}</TerminalInput>}

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/now-secrets/help.png`}
    width={650}
    height={509}
    caption="Help output of `now secrets`"
  />
}

## Certificates
To add a certificate as a secret, you need to base64-encode the certificate string before. Therefore, you might use the node-repl environment and read your certificate file, base64-encode it and copy the encoded string into clipboard. Now you are able to add it like any other secret.
${<TerminalInput>{`
# starting node repl
node
> // fs is necessary to read the cert file
> const fs = require('fs')
> // read file into string utf8 encoded
> const certString = fs.readFileSync('cert.pem', 'utf8')
> // encode utf8 string into base64-encoding
> console.log(Buffer.from(certString).toString('base64'))
> // copy base64-encoded string to clipboard and exit node repl with <CTRL>-<C>
now secret add cert "your base64-encoded string from clipboard"
`}</TerminalInput>}

Before you can use your certificate to access other apis, you need to decode the certificate:    
${<Code>{`console.log( Buffer.from(b64Encoded, 'base64').toString() )`}</Code>}

`)
