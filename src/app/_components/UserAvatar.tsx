import Image from "next/image"

export default function UserAvatar({size,imageURL}: { size: number,imageURL: string}) {
  return (
    <>
      <Image
        width={size}
        height={size}
        alt="avatar"
        // src={user.avatarUrl}
        src={imageURL!==""?imageURL:"/avatar.png"}
        className="rounded-full"
      />
    </>
  );
}