import { create } from 'zustand';
import axios from 'axios';

const useStore = create((set) => ({
    search: "", 
    data: [], 
    usersData: [],
    filteredData: [], 
    user: JSON.parse(localStorage.getItem("user")) || null,
    firstName: JSON.parse(localStorage.getItem("firstName")),
   
    fetchPost: async () => {
        try {
          const response = await axios.get('/panel');
          const fetchedData = response.data;
    
          set((state) => {
            const filteredData = fetchedData.filter((item) =>
              item.baslik.toLowerCase().includes(state.search.toLowerCase())
            ).reverse();
    
            return {
              data: fetchedData,
              filteredData: filteredData,
            };
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
    setSearch: (newSearch) => {
        set((state) => {
          const filteredData = state.data
            .filter((item) =>
              item.baslik.toLowerCase().includes(newSearch.toLowerCase())
            )
            .reverse();
    
          return {
            search: newSearch,
            filteredData: filteredData,
          };
        });
      },

    fetchUsers: async () => {
        try {
            const response = await axios.get(`/users`);
            set({ usersData: response.data })

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },
    fetchLike: async (postId, incrementValue) => {
        try {
            await axios.put(`/panel/like/${postId}`);
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

            const user = JSON.parse(localStorage.getItem('user')) || null;

            
            if (!user) {
                console.error('No user found');
                return;
            }


         
                const data = JSON.parse(localStorage.getItem("user"))


              
                const nickName = data?.result?.firstName

               
                const newPost = {
                    ...formData,    
                    nickName: nickName, 
                };


                axios.post('/panel', newPost)
                    .then((response) => {
                       
                        set((state) => {
                          
                            const updatedFilteredData = state?.data ? [...state.data, response.data] : [response.data];

                    
                            return {
                                filteredData: updatedFilteredData,
                            };
                        });
                    })
                    .catch((error) => {
                        console.error('Error submitting comment:', error);
                    });
     

        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    },

    fetchRegister: async (formData) => {

        try {
            const response = await axios.post("/uye-ol", formData); 


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
            const response = await axios.post("/signin", formData); 
            if (response) {

                localStorage.setItem("user", JSON.stringify(response.data));
                window.location.href = ("/ana-sayfa");
            } else {
                console.error("Response data is missing");
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    },
    fetchSifre: async (formData) => {
        try {
          
            const localEmail = JSON.parse(localStorage.getItem("user"));

           
            const email = localEmail?.result?.email;

            if (!email) {
                console.error("Email bilgisi bulunamadı.");
                console.log('E-posta bilgisi bulunamadı. Lütfen giriş yapın.');
                return;
            }

          
            const formDataWithEmail = { ...formData, email };

            console.log(formDataWithEmail); 

            const response = await axios.put("/sifre", formDataWithEmail);
         
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
