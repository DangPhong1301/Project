import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Banner from '../../components/Banner';
import CardCourse from '../../components/CardCourse';
import { useEffect, useState } from 'react';
import { ApiClient } from '../../interceptors/axios';
import React from "react"



function Home() {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        getDataFaq();
    }, []);
    const getDataFaq = async () => {
        await ApiClient().get('student/all-faqs').then(res => {
            setFaqs(res.data.faqs)
        })
    }

    return (
        <div className="App">
            <div>
                <Header />
            </div>
            <div>
                <Banner />
            </div>
            <div className='text-center text-4xl mt-10 mb-10'>
                <strong>KHOÁ HỌC NỔI BẬT 2023</strong>
            </div>
            <div>
                <CardCourse />
            </div>
            {/* <div className='text-center text-4xl mt-10 mb-10'>
                <strong>Tin Tức</strong>
            </div>
            <div>
                <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200" style={{ width: '30%', height: '564px' }}>
                 
                    <figure>
                        <img
                            src="https://picsum.photos/id/101/800/600"
                            alt="card image"
                        />
                    </figure>
                  
                    <div className="p-6">
                        <header className="mb-4">
                            <h3 className="text-xl font-medium text-slate-700">
                                The easy way to go
                            </h3>
                            <p className="text-sm text-slate-400"> By George, jun 3 2023</p>
                        </header>
                        <p>
                            Experience the simple pleasures of a world with no cars, and only
                            gentle walks through palm tree forests, and fallen coconuts. An
                            island that’s home to extraordinary cliffs, swelling oceans, and
                            mammoth manta rays.
                        </p>
                    </div>
                </div>
            </div> */}
            <div className='text-center text-4xl mt-10 mb-10'>
                <strong>FAQs</strong>
            </div>
            <div className='mb-10'>
                <section className="w-full divide-y divide-slate-200 rounded border border-slate-200 bg-white">
                    {faqs.map(faq => (
                        <details className="group p-4">
                            <summary className="relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                                {faq.faq_question}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    aria-labelledby="title-ac21 desc-ac21"
                                >
                                    <title id="title-ac21">Open icon</title>
                                    <desc id="desc-ac21">
                                        icon that represents the state of the summary
                                    </desc>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </summary>
                            <p className="mt-4 text-slate-500">
                                {faq.faq_answer}
                            </p>
                        </details>
                    ))}
                </section>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Home;