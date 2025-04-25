import { create } from 'zustand';
import axios from 'axios';
const basePath = process.env.REACT_APP_BASE_PATH;


const useStore = create((set) => ({
    search: "",
    data: [],
    usersData: [],
    filteredData: [],
    user: JSON.parse(localStorage.getItem("user")) || null,
    firstName: JSON.parse(localStorage.getItem("firstName")),
    
    fetchPost: async () => {
        try {
            const response = await axios.get(`${basePath}/panel`);
            const fetchedData = response.data ? response.data.reverse() : [];

            set((state) => {
                const dataFilter = fetchedData.filter((item) => {
                    const title = item.title?.toLowerCase() || '';
                    return title.includes(state.search.toLowerCase());
                });

                return {
                    data: fetchedData,
                    filteredData: dataFilter,
                };
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },

    setSearch: (newSearch) => {
        set((state) => {
            const filteredData = state.data.filter((item) =>
                item.title.toLowerCase().includes(newSearch.toLowerCase())
            );
            return {
                search: newSearch,
                filteredData: filteredData,
            };
        });
    },

    fetchUsers: async () => {
        try {
            const response = await axios.get(`${basePath}/users`);
            set({ usersData: response.data })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },

    fetchLike: async (postId, incrementValue) => {
        try {
            await axios.put(`${basePath}/panel/like/${postId}`);
            set((state) => {
                const updatedPosts = state.filteredData.map((post) =>
                    post._id === postId ? { ...post, likeCount: incrementValue } : post
                );
                return { filteredData: updatedPosts };
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },

    fetchComment: async (formData) => {
        try {
            const data = JSON.parse(localStorage.getItem("user"));
            const nickName = data?.result?.firstName;

            const newPost = {
                ...formData,
                nickName: nickName,
            };

            const response = await axios.post(`${basePath}/panel`, newPost);
            set((state) => ({
                filteredData: state?.filteredData ? [...state.filteredData, response.data] : [response.data],
            }));
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    },

    fetchRegister: async (formData) => {
        try {
            const response = await axios.post(`${basePath}/uye-ol`, formData);
            if (response) {
                localStorage.setItem("firstName", JSON.stringify(response.data.result.firstName));
                localStorage.setItem("userRegister", JSON.stringify(response.data.result));
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    },

    fetchLogin: async (formData) => {
        try {
            const response = await axios.post(`${basePath}/signin`, formData);
            if (response) {
                localStorage.setItem("user", JSON.stringify(response.data));
                window.location.href = ("/ana-sayfa");
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    },

    fetchSifre: async (formData) => {
        try {
            const formDataWithEmail = { ...formData };
            const response = await axios.put(`${basePath}/sifre`, formDataWithEmail);
            if (response.status === 200) {
                console.log("Şifre güncelleme başarılı.");
            } else {
                console.log("Şifre güncellenirken bir hata oluştu:", response.data.message);
            }
        } catch (error) {
            console.error("Hata oluştu:", error);
        }
    }

}));

export default useStore;
