import { create } from 'zustand';
import axios from 'axios';

const useStore = create((set) => ({
    data: [],  // Store the fetched data
    veri: [],
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
                );

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
            const filteredData = state.data.filter((item) =>
                item.baslik.toLowerCase().includes(newSearch.toLowerCase()) // Filter based on new search term
            );
            return {
                search: newSearch,
                filteredData: filteredData, // Update filtered data
            };
        });
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
            // `set` fonksiyonu içerisinde `state` parametresi mevcut
            set((state) => {
                const firstName = state.firstName;  // `state` burada parametre olarak geliyor
                const emailData = { 
                    ...formData,
                    acikla: firstName,  // acikla alanına firstName ekleniyor
                };
    
                // POST isteği
                const response = axios.post("http://localhost:6078/panel", emailData);  // Use POST if required by the backend
    
                // Eğer response.data yeni postu içeriyorsa
                response.then(res => {
                    const newPost = res.data; // response'dan yeni post verisini alıyoruz
    
                    // Filtrelenmiş veriyi güncelliyoruz
                    const updatedFilteredData = [...state.filteredData, newPost]; // Yeni postu ekliyoruz
    
                    return {
                        filteredData: updatedFilteredData, // filteredData'yı güncelliyoruz
                    };
                });
            });
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    },
    
    fetchRegister: async (formData) => {
     
        try {
           const response= await axios.post("http://localhost:6078/uye-ol", formData); // Use POST if required by the backend

        
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
     const response=  await axios.post("http://localhost:6078/signin", formData); // Use POST if required by the backend
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
