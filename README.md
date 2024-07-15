## Getting Started

1. Copy `/.env.example` in the root directory, rename to `/.env.local`. It should be like
```bash
AUTH_SECRET="jsvcldihnp3wor8evnpoasdf4tbowheivfspdnu"  # any random chars
POSTGRES_URL=postgres://postgres:postgres@localhost:5432/teacher-development-platform
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```
4. open Docker Desktop
5. in terminal
```bash
# install dependencies
yarn 

docker compose up -d
yarn migrate
yarn studio  # db interface

# run the website
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## You might need to know
#### users for testing
| 帳號 | 密碼 |
| ---- | ---- |
| one@gmail.com | 1234 |
| chengzhi@chengzhiedu.org | kist |
1. standard colors
    - usage:
```import { INDIGO, ORANGE } from "@/lib/constants";```
add `style={{backgroundColor: INDIGO}}` in component to change background color to INDIGO
2. session
    - usage:
```
import { auth } from "@/lib/auth";
const session = await auth();
const notAuth = (!session || !session?.user?.email);  # whether signed in
```
`session.user.email, session.user.username, session.user.mobile` to get signed-in-user's info
3. fake const data in `@/lib/constants`
    - usage (e.g. get user info from mobile):
```
import { USERS } from "@/lib/constants";
const userIndex = USERS.findIndex(({ mobile }) => mobile === userMobile);
const email = USERS[userIndex].email;
```
4. handle `TypeError: Response body object should not be disturbed or locked` when login
```bash
curl --max-time 0.001 -X POST http://localhost:3000/route
```

## Git Commands
1. clone the project
   ```bash
   git clone git@github.com:ining310/teacher-development-platform.git
   ```
2. add a new branch
   ```bash
   git checkout -b <new branch name> <existing branch>
   # or just
   git checkout -b <new branch name>
   ```
3. update code to github
    1. make your branch up to date
        ```bash
          git checkout <your branch>  # switch to your branch
          git fetch origin  # fetch code from github
          git rebase origin/main  # update main to your branch (auto merge, sometimes you'll need to fix conflicts manually)
        ```
    2. add(stage), commit, push
        ```bash
          git add .
          git commit -m "commit message"
          git push origin <to be pushed branch>
          # 如果他叫你 pull 的話(你有rebase到東西) 就可能要 push -f
        ```
4. run other branch (e.g. branch A)
   ```bash
    git checkout A

    # remember to install the dependencies
    yarn
    yarn dev
   ```
   
5. other useful commands
   ```bash
    # pull all branches on github
    git pull --all

    # merge branch A to B
    git checkout B
    git merge A
   ```

## drizzle update
1. update drizzle to latest
    ```bash 
    yarn add drizzle-kit@latest -D
    ```
2. in `package.json`, edit
    ```json
    "migrate": "drizzle-kit push:pg",
    ```
    to
    ```json
    "migrate": "drizzle-kit push",
    ```
3. in `drizzle.config.ts`, change to
   ```typescript
    import dotenv from "dotenv";
    import { defineConfig } from "drizzle-kit";

    dotenv.config({ path: "./.env.local" });

    if (!process.env.POSTGRES_URL) {
        throw new Error("POSTGRES_URL must be defined in .env.local");
    }

    export default defineConfig ({
        dialect: "postgresql",
        schema: "./src/db/schema.ts",
        out: "./drizzle",
        dbCredentials: { url: process.env.POSTGRES_URL },
    })
   ```
4. Now you can successfully use command `yarn migrate`, `yarn studio`, and so on.
