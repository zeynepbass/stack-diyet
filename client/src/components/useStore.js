import { create } from 'zustand';
import axios from 'axios';

const useStore = create((set) => ({
    data: [],  // Store the fetched data
    veri: [],
    usersData: [],
    filteredData: [], // Store the filtered data
    search: "", // Store the search term
    user: JSON.parse(localStorage.getItem("user")) || null,
    firstName: JSON.parse(localStorage.getItem("firstName")),
    // Fetch data from API
    fetchPost: async () => {
        try {
            const response = await axios.get('http://localhost:6078/panel');
            const fetchedData = response.data;

            // Get the current search term from state and filter the fetched data
            set((state) => {
                const filteredData = fetchedData.filter((item) =>
                    item.baslik.toLowerCase().includes(state.search.toLowerCase()) // Use search from state
                ).reverse();

                return {
                    data: fetchedData,
                    filteredData: filteredData, // Store the filtered data
                };
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },

    // Update search term and filter data accordingly
    setSearch: (newSearch) => {
        set((state) => {
            const filteredData = state.data
                .filter((item) =>
                    item.baslik.toLowerCase().includes(newSearch.toLowerCase()) // Filter based on new search term
                )
                .reverse();  // Reverse the order of the filtered data

            return {
                search: newSearch,
                filteredData: filteredData, // Update filtered data with reversed order
            };
        });
    },

    fetchUsers: async () => {
        try {
            const response = await axios.get(`http://localhost:6078/users`);
            set({ usersData: response.data })

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },
    fetchLike: async (postId, incrementValue) => {
        try {
            await axios.put(`http://localhost:6078/panel/like/${postId}`);
            set((state) => {
                const updatedPosts = state.filteredData.map((post) =>
                    post._id === postId ? { ...post, likeCount: incrementValue } : post
                );
                return {
                    filteredData: updatedPosts,
                };
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },
    fetchComment: async (formData) => {
        try {
            // Get user from localStorage
            const user = JSON.parse(localStorage.getItem('user')) || null;
    
            // Check if user exists
            if (!user) {
                console.error('No user found');
                return;
            }
    
            // Get usersData from the store state
            set((state) => {
                const usersData = state?.usersData;
    
                // Ensure usersData is populated and find the user with matching email
                const userMatch = usersData?.find((item) => item.email === user.result.email);
    
                if (!userMatch) {
                    console.error('User not found in usersData');
                    return;
                }
    
                // Fetch the nickname (use the correct field name, assuming it's firstName)
                const nickName = userMatch.nickName || userMatch.firstName;
    
                // Create the new post object with the formData and the user's nickname
                const newPost = {
                    ...formData,    // Include formData fields
                    nickName: nickName, // Add nickname from the user
                };
    
                // Now, send newPost to the API
                axios.post('http://localhost:6078/panel', newPost)
                    .then((response) => {
                        // Update filteredData with the new post, making sure filteredData is defined
                        set((state) => {
                            // Make sure filteredData is initialized properly if it's undefined
                            const updatedFilteredData = state?.data ? [...state.data, response.data] : [response.data];
    
                            // Return the updated state with filteredData
                            return {
                                filteredData: updatedFilteredData,
                            };
                        });
                    })
                    .catch((error) => {
                        console.error('Error submitting comment:', error);
                    });
            });
    
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    },
    
    fetchRegister: async (formData) => {

        try {
            const response = await axios.post("http://localhost:6078/uye-ol", formData); // Use POST if required by the backend


            if (response) {

                localStorage.setItem("firstName", JSON.stringify(response.data.result.firstName));
            } else {
                console.error("Response data is missing");
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    },
    fetchLogin: async (formData) => {

        try {
            const response = await axios.post("http://localhost:6078/signin", formData); // Use POST if required by the backend
            if (response) {

                localStorage.setItem("user", JSON.stringify(response.data));
            } else {
                console.error("Response data is missing");
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    },
    fetchSifre: async (formData) => {
        try {
            // localStorage'dan "user" bilgilerini al
            const localEmail = JSON.parse(localStorage.getItem("user"));

            // localEmail objesinin içinde yer alan email alanını al
            const email = localEmail?.result?.email;

            if (!email) {
                console.error("Email bilgisi bulunamadı.");
                console.log('E-posta bilgisi bulunamadı. Lütfen giriş yapın.');
                return;
            }

            // formData'ya email'i ekle
            const formDataWithEmail = { ...formData, email };

            console.log(formDataWithEmail); // Kontrol amacıyla

            const response = await axios.put("http://localhost:6078/sifre", formDataWithEmail);
            console.log(response);  // API'den gelen yanıtı kontrol et

            // API yanıtını kontrol et
            if (response.data.success) {
                console.log("Şifre güncelleme başarılı.");


            } else {
                console.log("Şifre güncellenirken bir hata oluştu.");
            }

        } catch (error) {
            console.error("Hata oluştu:", error);
            console.log("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    }

}));

export default useStore;
