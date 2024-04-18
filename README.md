# nextjs-auth-user-data-anywhere-in-clientside

nextjs auth example using postgres and prisma ORM.   
Most importantly you can access user data anywhere in 'use client' side like this:
```
<p>logged in user: <span className="font-bold">{session?.data?.user?.email}</span></p>
<p>logged in user username: <span className="font-bold">{session.data?.user?.fullData.username}</span></p>
```

## Problem
How to make some custom data about user available in every client side page.


## Running example

### Using Docker
```
docker build -t nextjs-auth-app .
docker run --name nextjs-auth-app -p 3000:3000 nextjs-auth-app
```

### npm
```
npm install  
npm run dev
```
enjoy at localhost:3000


