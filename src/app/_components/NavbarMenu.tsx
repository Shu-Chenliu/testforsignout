"use client"

import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import UserAvatar from "./UserAvatar"
import { ADMIN, INDIGO, LIGHT_BLUE ,PRINCIPAL,DIRECTOR_EDITABLE} from "@/lib/constants"
import { Separator } from "@/components/ui/separator"
import { User } from "@/lib/types/db"
type Props={
  user:User;
}
export function NavbarMenu({user}: Props) {
  // const { data: session } = useSession();
  const authority = user?.authority;
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-transparent active:bg-transparent">
            <div className="flex">
              <UserAvatar size={24} 
              // userEmail={user.email} 
              imageURL={user.imageURL?user.imageURL:""}/>
              <div
                className="flex items-center gap-1.5 rounded-sm hover:opacity-80 py-1 px-2 font-semibold"
              >
                {user.username}
              </div>
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 p-4 w-32 text-sm" style={{ color: INDIGO, backgroundColor: LIGHT_BLUE }} >
              <a href="/AboutMe" className="hover:opacity-70">{authority===ADMIN?"功能總表":"關於我"}</a>
              <Separator className="bg-white opacity-50" />
              {authority===ADMIN &&
                <>
                  <a href="/AccountManage" className="hover:opacity-70">帳號管理</a>
                  <a href="/CourseManagement" className="hover:opacity-70"> 課程管理</a>
                  <a href="/MyIDP" className="hover:opacity-70"> IDP管理</a>
                </>
              }
              {authority !==ADMIN &&<a href="/CourseHistory" className="hover:opacity-70"> 我的修課紀錄</a>}
              {/* <a href={authority!==ADMIN?"/CourseHistory":"/CourseHistory/ExportHistory"} className="hover:opacity-70">{authority!==ADMIN ? "我的" : "教師"}修課紀錄</a> */}
              {authority !==ADMIN &&<a href="/MyLectureHistory" className="hover:opacity-70"> 我的講師紀錄</a>}
              {/* <a href="/MyLectureHistory" className="hover:opacity-70">{authority!==ADMIN ? "我的" : "教師"}講師紀錄</a> */}
              {authority!==ADMIN && <a href="/MyIDP" className="hover:opacity-70">我的IDP</a>}
              {(authority===ADMIN||authority===PRINCIPAL||authority===DIRECTOR_EDITABLE) &&
                <>
                  <Separator className="bg-white opacity-50" />
                  {/* <a href="/TeacherHistory" className="hover:opacity-70">教師修課紀錄</a> */}
                  <a href="/CourseHistory/ExportHistory" className="hover:opacity-70">教師修課紀錄</a>
                  <a href="/IDPRecords" className="hover:opacity-70">教師 IDP</a>
                  {authority!==ADMIN && <a href="/AccountManage" className="hover:opacity-70">校內帳號管理</a>}
                </>
              }
              <Separator className="bg-white opacity-50" />
              <a href="/auth/signout" className="hover:opacity-70">登出</a>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}