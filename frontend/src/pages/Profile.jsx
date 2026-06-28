import { useContext } from "react";
import { Link } from "react-router-dom";
import SunnyPage from "../components/SunnyPage";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const isHost = user.userType === "host";
  const role = isHost ? "Host" : "Guest";
  const firstLetter = user.fullName.charAt(0).toUpperCase();

  return (
    <SunnyPage
      title={`${role} Profile`}
      subtitle="View your account details and continue where you left off."
      maxWidth="max-w-5xl"
      background={isHost ? "bg-orange-100" : "bg-yellow-100"}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border-2 border-black bg-white p-6">
          <div className="flex items-center gap-4">
            <div className={`flex h-20 w-20 items-center justify-center rounded-full border-2 border-black ${isHost ? "bg-orange-300" : "bg-yellow-300"} text-2xl font-bold text-black`}>
              {firstLetter}
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-black/60">
                {role} Account
              </p>
              <h2 className="text-2xl font-bold text-black">
                {user.fullName}
              </h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-sm font-semibold text-black/60">Email</p>
              <p className="font-medium text-black">{user.email}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-black/60">Role</p>
              <p className="font-medium text-black">{role}</p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border-2 border-black bg-white p-6">
          <h2 className="text-2xl font-bold text-black">
            {isHost ? "Host Workspace" : "Guest Workspace"}
          </h2>
          <p className="mt-2 text-black/70">
            {isHost
              ? "Manage your summer activity listings and create new camps for guests."
              : "Explore summer camps, track bookings, and keep your favorite activities ready."}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {isHost ? (
              <>
                <Link
                  to="/host/my-camps"
                  className="rounded-lg border-2 border-black bg-orange-300 px-4 py-3 text-center font-semibold text-black hover:bg-orange-200"
                >
                  Manage Camps
                </Link>

                <Link
                  to="/host/create-camp"
                  className="rounded-lg border-2 border-black bg-orange-300 px-4 py-3 text-center font-semibold text-black hover:bg-orange-200"
                >
                  Create Camp
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/camps"
                  className="rounded-lg border-2 border-black bg-yellow-300 px-4 py-3 text-center font-semibold text-black hover:bg-yellow-200"
                >
                  Browse Camps
                </Link>

                <Link
                  to="/bookings"
                  className="rounded-lg border-2 border-black bg-yellow-300 px-4 py-3 text-center font-semibold text-black hover:bg-yellow-200"
                >
                  My Bookings
                </Link>

                <Link
                  to="/favorites"
                  className="rounded-lg border-2 border-black bg-yellow-300 px-4 py-3 text-center font-semibold text-black hover:bg-yellow-200"
                >
                  Favorites
                </Link>
              </>
            )}
          </div>
        </section>
      </div>
    </SunnyPage>
  );
};

export default Profile;
