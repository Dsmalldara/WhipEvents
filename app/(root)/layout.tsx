import Footer from "../SharedComp/Footer";
import Header from "../SharedComp/Header";
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="h-screen flex flex-col ">
        <main className="flex-1">
        <Header/>
          {children}
          <Footer/>
          </main>

      </div>
    ); 
  }
  