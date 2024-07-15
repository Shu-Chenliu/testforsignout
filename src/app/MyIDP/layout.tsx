import { EditIdpProblemProvider } from "../hooks/EditIdpProblemContext";
import { WriteIdpProvider } from "../hooks/WriteIdpContext";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <div className="w-full h-full">
      <WriteIdpProvider>
        <EditIdpProblemProvider>
          {children}
        </EditIdpProblemProvider>
      </WriteIdpProvider>
      </div>
    </>
  );
}

export default Layout;