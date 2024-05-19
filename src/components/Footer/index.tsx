export default function Footer() {
    return (
      <footer className="mx-auto max-w-[1920px] px-3 bg-gray-100" >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b py-3 text-gray-600 transition-colors duration-150 bg-gray-100">
          <div className=" justify-center col-span-1 lg:col-span-1">
            <h1 className="text-2px">
              <b>Contato</b>
            </h1>
            <div className="text-1px">
              <h2>E-mail</h2>
              <h2>Telefone</h2>
              <h2>Whatsapp</h2>
            </div>
          </div>
          <div className="justify-center col-span-1 lg:col-span-1">
          <h1 className="text-2px"><b>Menu</b> </h1>
            <div className="text-1px">
              <h2>Login</h2>
              <h2>Cadastro</h2>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-6 flex items-start lg:justify-start text-black">
          </div>
        </div>
        <div className="py-4 flex flex-col md:flex-row justify-center items-center space-y-4 bg-gray-100">
          <div>
            <span><h1 className='text-gray-500 '> &copy; WIL TICKETS, 2023. Todos os direitos reservados.</h1></span>
          </div>
        </div>
      </footer>
    );
}