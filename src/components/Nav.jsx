import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="drawer">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Finished Goods</div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal gap-4">
              {/* Navbar menu content here */}
              <Link to={"master-db"}>Master Database</Link>
              <Link to={"https://forms.gle/vjsiiVe2ikDCGYtLA"}>Add Item</Link>
              <Link to={"finished-goods"}>Update Goods</Link>
              <Link to={"https://forms.gle/MAVCd8oqvnEsLTZq7"}>
                Request Item Removal
              </Link>
              <Link to={"https://forms.gle/WCuSoJdsYq1FrtSH6"}>
                Report Issue
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-1/2 p-0">
          {/* Sidebar content here */}
          <Link to={"master-db"}>
            <button className="btn btn-ghost w-full justify-start">
              Master Database
            </button>
          </Link>
          <Link to={"https://forms.gle/vjsiiVe2ikDCGYtLA"}>
            <button className="btn btn-ghost w-full justify-start">
              Add Item
            </button>
          </Link>
          <Link to={"finished-goods"}>
            <button className="btn btn-ghost w-full justify-start">
              Update Goods
            </button>
          </Link>
          <Link to={"https://forms.gle/MAVCd8oqvnEsLTZq7"}>
            <button className="btn btn-ghost w-full justify-start">
              Request Item Removal
            </button>
          </Link>
          <Link to={"https://forms.gle/WCuSoJdsYq1FrtSH6"}>
            <button className="btn btn-ghost w-full justify-start">
              Report Issue
            </button>
          </Link>
        </ul>
      </div>
    </div>
  );
}
