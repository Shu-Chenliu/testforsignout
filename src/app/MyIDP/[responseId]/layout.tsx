type Props = {
  children: React.ReactNode;
  params: { idpId: string };
};

function Layout({ children }: Props) {
  return (
    <>
      <div className="w-full h-full">
        {children}
      </div>
    </>
  );
}

export default Layout;