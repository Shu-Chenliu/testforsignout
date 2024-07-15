type Props = {
  children: React.ReactNode;
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