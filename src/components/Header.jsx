import logo from "../assets/available.png"

const Header = () => {
  return (
    <div className="mt-5 flex flex-row justify-between items-center gap-5 shadow-lg p-4 border rounded-lg">
        <button className="btn btn-primary btn-sm md:btn-md">+ New Prompt</button>
        <h1 className="font-bold text-3xl leading-none ">50 Best Prompts</h1>
        
        <div className="justify-center items-center flex flex-col gap-2">
            <img src={logo} alt="" className="w-10 h-10" />
            <h2 className="font-bold text-sm hidden md:block">By Tanbir</h2>
        </div>

    </div>
  )
}

export default Header