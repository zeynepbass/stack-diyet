import React from 'react'
import useStore from "../../components/useStore"

const Footer = () => { // Changed footer to Footer
    const { filteredData } = useStore();

    const top5Posts = filteredData
        .filter((item) => item.likeCount) // Filter posts where likeCount exists
        .sort((a, b) => b.likeCount - a.likeCount) // Sort by likeCount in descending order
        .slice(0, 5);

    return (
        <div className="grid grid-cols-1 gap-4 ">

            <div className="w-full h-[400px] bg-purple-50 rounded-xl  border-2 border-purple-100 p-4">
                {/* Here you can map over `top5Posts` to display the posts */}
                {top5Posts.map((post) => (
                    <div key={post.id} className="post-card">
                        <span>{post.baslik}</span>
                      &nbsp;   <span style={{color:"red"}}>{post.likeCount} Beğeni</span>
                    </div>
                ))}
            </div>

            <div className="w-full h-[150px]  rounded-xl  border-2 border-gray-50">
                <div className='p-1'>
                <h4 className="font-semibold text-slate-700">Soru Soran Kullanıcılar</h4>
                    <div className="mt-3 flex -space-x-2 overflow-hidden">
                        <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://www.evobulut.com/img/evobulut/personel.jpg" alt="{user.handle}" />
                    </div>
                    <div className="mt-3 text-sm font-medium">
                        <a href="#" className="text-gray-500">+ {filteredData.length} kullanıcı</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer; // Make sure to export Footer with an uppercase "F"
