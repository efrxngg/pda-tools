import {useLocation, useNavigate} from "react-router-dom"

export const NotFound = () => {
  const navigate = useNavigate()
  const location = useLocation()
  setTimeout(() => {
    navigate("/")
  }, 10000)

  return (
    <>
      <main className="h-screen w-screen bg-neutral-800 text-white">
        <div className="h-full w-full flex flex-col items-center justify-center text-2xl uppercase">
          <h1> 404 </h1>
          <span>Not found</span>
          <button onClick={() => navigate(location.state?.location?.pathname ?? "/")}>Back</button>
        </div>
      </main>
    </>
  )
}