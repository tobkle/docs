import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { leo, jamo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { Code } from '../../../components/text/code'
import { TerminalInput } from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'Hide complexity of microservices from the user',
  date: '15 Mar 2017',
  authors: [leo, jamo],
})(markdown(components)`
With the microservices architecture, we break down the whole app into multiple independent programs. One such program is called a microservice. This architecture gives us a lot of benefits including:

- **Parallelize** workload by distributing ownership and responsibility across different teams.
- **Mix up** different languages, frameworks and even varied versions of those.
- **Scale** easily by adding more resources to independent microservices as needed.

With this architecture, now we have to deal with a lot of microservices. However, exposing them to the public is not a good idea. If we can hide these microservices under a single domain name, that will give us better results.

For example, let's say our app has a set of microservices as shown below:

${<Code>{`- frontend.our-domain.com
- backend.our-domain.com
- api.our-domain.com
`}</Code>}

As it is not a good idea to expose these urls to the public, we can map these services into our main domain like this:

${<Code>{`- our-domain.com/app -> backend.our-domain.com
- our-domain.com/api/** -> api.our-domain.com
- our-domain.com/** -> frontend.our-domain.com
`}</Code>}

As our app evolves, we need to merge both \`backend\` and \`frontend\` into a single microservice. We also need to add a new microservice for \`/api/register\` to handle the increasing load.

We can do a new mapping like this:

${<Code>{`- our-domain.com/api/register -> api-register.our-domain.com
- our-domain.com/api -> api.our-domain.com
- our-domain.com/* -> ui.our-domain.com
`}</Code>}

After this, we will have whole new microservices set up. However, our end users do not need to know about these changes.

> Hence, with this setup we can manage the architecture of our microservices and change them at will without downtime or having to notify users.

## Path Alias

If you manage your domain inside ZEIT, you can hide microservices under a domain as shown above with our "Path Alias" feature.

Here's how to do it.

Create a file called \`rules.json\` and add the following content:

${<Code>{`{
  "rules": [
    { "pathname": "/api/register", "methods": ["POST"], "dest": "api-register-wcepelgodl.now.sh" },
    { "pathname": "/api/**", "methods": ["GET", "POST"], "dest": "api-tuhpdtgoja-now.sh" },
    { "dest": "ui-dbuyejqwio.now.sh" }
  ]
}
`}</Code>}

Then run the following command:

${<TerminalInput>now alias our-domain.com -r rules.json</TerminalInput>}

Every time you run the above command, the rules for \`our-domain.com\` will be updated without any downtime.

## API

As you have seen in the above example, you can define a set of rules. These rules are executed in **order**. An incoming HTTP request will be sent to the destination mentioned in the first matching rule.

A rule should contain the \`dest\` field and one or many optional fields including \`pathname\` and \`method\`. Here's a detailed definition of each of these fields.

#### dest

The destination of each rule should be one of the following:

- The unique now deployment url like \`mysite-wcepelgodl.now.sh\`
- An alias like \`our-app-ui.now.sh\`
- An external hostname that may not point to a \`now.sh\` deployment.

> You can get the original hostname from the \`X-Forwarded-Host\` header.

### pathname (optional)

Incoming HTTP requests will be matched with the pathname format defined in the rule. The \`pathname\` field could have one of the following formats:

* **/api/register** - A strict path match
* **/user/*/profile** - A wildcard rule matches pathnames like \`/user/rauchg/profile\`
* **/api/**** - A wildcard rule matches pathnames with multiple segments like \`/api/user/email\` or \`/api/login\`

If there is no \`pathname\` field, all the requests will be a candidate for the rule.

### methods (optional)

This is a list of HTTP method types that the rule supports. It can have one or many methods like this:

${<Code>{`{ "pathname": "/api/**", "methods": ["GET", "POST"], "dest": "api-tuhpdtgoja-now.sh" }
`}</Code>}

If there is no \`methods\` field, requests with any HTTP method will be a candidate for the rule.

## Managing Rules

Have a look at the rules we have introduced previously:

${<Code>{`{
  "rules": [
    { "pathname": "/api/register", "methods": ["POST"], "dest": "api-register-wcepelgodl.now.sh" },
    { "pathname": "/api/**", "methods": ["GET", "POST"], "dest": "api-tuhpdtgoja-now.sh" },
    { "dest": "ui-dbuyejqwio.now.sh" }
  ]
}
`}</Code>}

Destinations of these rules are unique ${<Now color="#000" />} deployment urls. They will be changed every time you deploy a new version. Therefore, you need to update the rules again and again.

It works, but there is a better way to do this.

Have a look at the following set of rules.

${<Code>{`{
  "rules": [
    { "pathname": "/api/register", "methods": ["POST"], "dest": "my-api-register.now.sh" },
    { "pathname": "/api/**", "methods": ["GET", "POST"], "dest": "my-api.now.sh" },
    { "dest": "my-ui.now.sh" }
  ]
}
`}</Code>}

Now for the \`dest\` field, instead of the deployment url(\`api-tuhpdtgoja-now.sh\`), we now have an alias(\`my-api.now.sh\`).

Then we only need to set these rules once, unless you change the microservices setup.

With this setup, let's say you've deployed a new version of the "api microservice" and its deployment url is \`api-iewodtfalq-now.sh\`.

Now simply map it to the alias like this:

${<TerminalInput>now alias api-iewodtfalq-now.sh my-api.now.sh</TerminalInput>}

That's all.
`)
