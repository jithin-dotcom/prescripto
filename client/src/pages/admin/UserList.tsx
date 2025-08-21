

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
import { APIRoutes } from "../../constants/routes.constants";

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState<number>(4);

  

  const getUsers = async (page = 1, query = "", limit = pageSize) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${APIRoutes.ADMIN_GET_USERS}?role=user&page=${page}&limit=${limit}&search=${query}`);
      setUsers(res.data.data.items);
      setTotalPages(res.data.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedSearch(search);
  }, 500);

  return () => clearTimeout(handler);
}, [search]);

useEffect(() => {
  getUsers(currentPage, debouncedSearch);
}, [currentPage, debouncedSearch, pageSize]);

  const toggleBlockStatus = async (userId: string) => {
    try {
      await axiosInstance.patch(`${APIRoutes.ADMIN_BLOCK_TOGGLE}/${userId}`);
      
      setUsers(prev => prev.map(user => user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user));
      toast.success("Successfully toggled block status");
    } catch (error) {
      const message = error instanceof AxiosError ? error.message : "Error toggling block status";
      console.error(message);
    }
  };

  const toggleVerifiedStatus = async (userId: string) => {
    try {
      await axiosInstance.patch(`${APIRoutes.ADMIN_VERIFY_TOGGLE}/${userId}`);
     
     setUsers(prev => prev.map(user => user.id === userId ? { ...user, isVerified: !user.isVerified } : user));
      toast.success("Successfully toggled verify status");
    } catch (error) {
      const message = error instanceof AxiosError ? error.message : "Error toggling verify status";
      console.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col bg-gradient-to-br from-blue-100 to-indigo-100">
      <Navbar />
      <div className="flex flex-1">
        <SidebarAdmin />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto mt-12 bg-gradient-to-br from-blue-100 to-indigo-100">
         
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h1 className="text-2xl font-semibold text-gray-700">All Users</h1>

            <div className="relative w-full sm:w-80 bg-white rounded-lg">
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
                  console.log("users : ", user);
                  return (
                    <div
                      key={user.id}
                       onClick={() => navigate(`/edit-user/${user.id}`)}
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
                             
                              onChange={() => toggleVerifiedStatus(user.id)}
                              onClick={(e) => e.stopPropagation()}
                              readOnly
                            />
                            Verified
                          </label>
                          <label className="flex items-center gap-1 text-gray-700">
                            <input
                              type="checkbox"
                              checked={user.isBlocked}
          
                              onChange={() => toggleBlockStatus(user.id)}
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

             
              <div className="mt-8">
                {totalPages >= 1 && (
                  
                  <Pagination
                   currentPage={currentPage}
                   totalPages={totalPages}
                   onPageChange={setCurrentPage}
                   pageSize={pageSize}
                   onPageSizeChange={(size) => {
                   setPageSize(size);
                   setCurrentPage(1); 
                  }}
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































