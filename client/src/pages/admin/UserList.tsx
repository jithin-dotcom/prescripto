


// interface UserProfile {
//   city?: string;
//   state?: string;
// }

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   photo?: string;
//   isVerified: boolean;
//   isBlocked: boolean;
//   profile?: UserProfile[];
// }








// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import axiosInstance from "../../utils/axios";
// import { toast } from "react-toastify";
// import { AxiosError } from "axios";
// import { useNavigate } from "react-router-dom";
// import type { User } from "../../interfaces/IUserList";



// const UsersList: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getUser() {
//       try {
//         const res = await axiosInstance.get("/admin/users?role=user");
//         console.log("users: ", res.data);
//         setUsers(res.data.data.items); // Set only the users array
//       } catch (error) {
//         console.error("Failed to fetch users", error);
//       }
//     }

//     getUser();
//   }, []);


//   const toggleBlockStatus = async (userId: string) => {
//      try {
//         await axiosInstance.patch(`/admin/block-toggle/${userId}`)
//         setUsers((prev) => {
//           return prev.map((doc) =>{
//              return doc._id === userId ? {...doc,isBlocked:!doc.isBlocked} : doc;
//            })
//         });
//         toast.success("successfully toggled Block status");
//      } catch (error) {
//         if(error instanceof AxiosError){
//            toast.error(error.message || "error toggling doctor isBlocked");
//         }else{
//            toast.error("error toggling doctor isBlocked");
//         }
//      }
//   }

//   const toggleVerifiedStatus = async (userId: string) => {
//     try {
//       await axiosInstance.patch(`/admin/verify-toggle/${userId}`)
//       setUsers((prev) => {
//          return prev.map((doc)=>{
//             return doc._id === userId ? {...doc,isVerified: !doc.isVerified} : doc;
//          })
//       });
//       toast.success("successfully toggled Verify status");
//     } catch (error) {
//       if(error instanceof AxiosError){
//          toast.error(error.message || "error toggling doctor isVerified");
//       }else{
//          toast.error("error toggling doctor isVerified");
//       }
//     }
//   }


//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       {/* Top Navbar */}
//       <Navbar />

//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <SidebarAdmin />

//         {/* Main Content */}
//         <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
//           <h1 className="text-2xl font-semibold text-gray-700 mb-6">All Users</h1>

//           {/* Responsive Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {users.map((user) => {
//               const profile = user.profile?.[0] || {}; 
//               return (
//                 <div
//                   key={user._id}
//                   onClick={() => navigate(`/edit-user/${user._id}`)}
//                   className="border border-[#C9D8FF] rounded-xl bg-white shadow-sm overflow-hidden cursor-pointer group transition hover:shadow-lg hover:scale-105"
//                 >
//                   <img
//                     src={
//                       user.photo ||
//                       "https://via.placeholder.com/300x200?text=User"
//                     }
//                     alt={user.name}
//                     className="w-full h-40 object-cover bg-[#EAEFFF] group-hover:bg-[#5F6FFF] transition-all duration-500"
//                   />
//                   <div className="p-4">
//                     <p className="text-lg font-medium text-[#262626]">
//                       {user.name}
//                     </p>
//                     <p className="text-sm text-[#5C5C5C]">
//                       Email: {user.email}
//                     </p>
//                     <p className="text-sm text-[#5C5C5C]">
//                       Place: {profile.city || "N/A"},{" "}
//                       {profile.state || ""}
//                     </p>

//                     <div className="mt-3 flex items-center gap-4 text-sm">
//                       <div className="flex items-center gap-1">
//                         <input
//                           type="checkbox"
//                           checked={user.isVerified}
//                           onChange={() => toggleVerifiedStatus(user._id)}
//                           onClick={(e) => e.stopPropagation()}
//                           readOnly
//                         />
//                         <label className="text-gray-700">Verified</label>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <input
//                           type="checkbox"
//                           checked={user.isBlocked}
//                           onChange={() => toggleBlockStatus(user._id)}
//                           onClick={(e) => e.stopPropagation()}
//                           readOnly
//                         />
//                         <label className="text-gray-700">Blocked</label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default UsersList;










// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import axiosInstance from "../../utils/axios";
// import { toast } from "react-toastify";
// import { AxiosError } from "axios";
// import { useNavigate } from "react-router-dom";
// import type { User } from "../../interfaces/IUserList";
// import Pagination from "../../components/Pagination";

// const UsersList: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const [loading, setLoading] = useState<boolean>(true);
//   const navigate = useNavigate();

//   const limit = 2; // You can change this as needed

//   const getUsers = async (page = 1) => {
//     setLoading(true);
//     try {
//       const res = await axiosInstance.get(`/admin/users?role=user&page=${page}&limit=${limit}`);
//       setUsers(res.data.data.items);
//       setTotalPages(res.data.data.totalPages);
//     } catch (error) {
//       console.error("Failed to fetch users", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getUsers(currentPage);
//   }, [currentPage]);

//   const toggleBlockStatus = async (userId: string) => {
//     try {
//       await axiosInstance.patch(`/admin/block-toggle/${userId}`);
//       setUsers((prev) =>
//         prev.map((doc) =>
//           doc._id === userId ? { ...doc, isBlocked: !doc.isBlocked } : doc
//         )
//       );
//       toast.success("Successfully toggled block status");
//     } catch (error) {
//       const message =
//         error instanceof AxiosError ? error.message : "Error toggling block status";
//       toast.error(message);
//     }
//   };

//   const toggleVerifiedStatus = async (userId: string) => {
//     try {
//       await axiosInstance.patch(`/admin/verify-toggle/${userId}`);
//       setUsers((prev) =>
//         prev.map((doc) =>
//           doc._id === userId ? { ...doc, isVerified: !doc.isVerified } : doc
//         )
//       );
//       toast.success("Successfully toggled verify status");
//     } catch (error) {
//       const message =
//         error instanceof AxiosError ? error.message : "Error toggling verify status";
//       toast.error(message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />
//       <div className="flex flex-1">
//         <SidebarAdmin />
//         <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
//           <h1 className="text-2xl font-semibold text-gray-700 mb-6">All Users</h1>

//           {loading ? (
//             <p className="text-center text-gray-600">Loading users...</p>
//           ) : users.length === 0 ? (
//             <p className="text-center text-gray-600">No users found.</p>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {users.map((user) => {
//                   const profile = user.profile?.[0] || {};
//                   return (
//                     <div
//                       key={user._id}
//                       onClick={() => navigate(`/edit-user/${user._id}`)}
//                       className="border border-[#C9D8FF] rounded-xl bg-white shadow-sm overflow-hidden cursor-pointer group transition hover:shadow-lg hover:scale-105"
//                     >
//                       <img
//                         src={
//                           user.photo || "https://via.placeholder.com/300x200?text=User"
//                         }
//                         alt={user.name}
//                         className="w-full h-40 object-cover bg-[#EAEFFF] group-hover:bg-[#5F6FFF] transition-all duration-500"
//                       />
//                       <div className="p-4">
//                         <p className="text-lg font-medium text-[#262626]">{user.name}</p>
//                         <p className="text-sm text-[#5C5C5C]">Email: {user.email}</p>
//                         <p className="text-sm text-[#5C5C5C]">
//                           Place: {profile.city || "N/A"}, {profile.state || ""}
//                         </p>

//                         <div className="mt-3 flex items-center gap-4 text-sm">
//                           <label className="flex items-center gap-1 text-gray-700">
//                             <input
//                               type="checkbox"
//                               checked={user.isVerified}
//                               onChange={() => toggleVerifiedStatus(user._id)}
//                               onClick={(e) => e.stopPropagation()}
//                               readOnly
//                             />
//                             Verified
//                           </label>
//                           <label className="flex items-center gap-1 text-gray-700">
//                             <input
//                               type="checkbox"
//                               checked={user.isBlocked}
//                               onChange={() => toggleBlockStatus(user._id)}
//                               onClick={(e) => e.stopPropagation()}
//                               readOnly
//                             />
//                             Blocked
//                           </label>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Pagination */}
//               <div className="mt-8">
//                 {totalPages >= 1 && (
//                   <Pagination
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     onPageChange={setCurrentPage}
//                   />
//                 )}
//               </div>
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default UsersList;








import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SideBarAdmin";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import type { User } from "../../interfaces/IUserList";
import Pagination from "../../components/Pagination";
import { Search } from "lucide-react";

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const navigate = useNavigate();

  const limit = 2;

  const getUsers = async (page = 1, query = "") => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/admin/users?role=user&page=${page}&limit=${limit}&search=${query}`);
      setUsers(res.data.data.items);
      setTotalPages(res.data.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   getUsers(currentPage, search);
  // }, [currentPage, search]);

  useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedSearch(search);
  }, 500);

  return () => clearTimeout(handler);
}, [search]);

useEffect(() => {
  getUsers(currentPage, debouncedSearch);
}, [currentPage, debouncedSearch]);

  const toggleBlockStatus = async (userId: string) => {
    try {
      await axiosInstance.patch(`/admin/block-toggle/${userId}`);
      setUsers(prev => prev.map(user => user._id === userId ? { ...user, isBlocked: !user.isBlocked } : user));
      toast.success("Successfully toggled block status");
    } catch (error) {
      const message = error instanceof AxiosError ? error.message : "Error toggling block status";
      toast.error(message);
    }
  };

  const toggleVerifiedStatus = async (userId: string) => {
    try {
      await axiosInstance.patch(`/admin/verify-toggle/${userId}`);
      setUsers(prev => prev.map(user => user._id === userId ? { ...user, isVerified: !user.isVerified } : user));
      toast.success("Successfully toggled verify status");
    } catch (error) {
      const message = error instanceof AxiosError ? error.message : "Error toggling verify status";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <SidebarAdmin />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* Header with Search */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h1 className="text-2xl font-semibold text-gray-700">All Users</h1>

            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
            </div>
          </div>

          {loading ? (
            <p className="text-center text-gray-600">Loading users...</p>
          ) : users.length === 0 ? (
            <p className="text-center text-gray-600">No users found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {users.map((user) => {
                  const profile = user.profile?.[0] || {};
                  return (
                    <div
                      key={user._id}
                      onClick={() => navigate(`/edit-user/${user._id}`)}
                      className="border border-[#C9D8FF] rounded-xl bg-white shadow-sm overflow-hidden cursor-pointer group transition hover:shadow-lg hover:scale-105"
                    >
                      <img
                        src={user.photo || "https://via.placeholder.com/300x200?text=User"}
                        alt={user.name}
                        className="w-full h-40 object-cover bg-[#EAEFFF] group-hover:bg-[#5F6FFF] transition-all duration-500"
                      />
                      <div className="p-4">
                        <p className="text-lg font-medium text-[#262626]">{user.name}</p>
                        <p className="text-sm text-[#5C5C5C]">Email: {user.email}</p>
                        <p className="text-sm text-[#5C5C5C]">Place: {profile.city || "N/A"}, {profile.state || ""}</p>

                        <div className="mt-3 flex items-center gap-4 text-sm">
                          <label className="flex items-center gap-1 text-gray-700">
                            <input
                              type="checkbox"
                              checked={user.isVerified}
                              onChange={() => toggleVerifiedStatus(user._id)}
                              onClick={(e) => e.stopPropagation()}
                              readOnly
                            />
                            Verified
                          </label>
                          <label className="flex items-center gap-1 text-gray-700">
                            <input
                              type="checkbox"
                              checked={user.isBlocked}
                              onChange={() => toggleBlockStatus(user._id)}
                              onClick={(e) => e.stopPropagation()}
                              readOnly
                            />
                            Blocked
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="mt-8">
                {totalPages >= 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default UsersList;
