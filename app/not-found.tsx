"use client";

import Image from "next/image";

export default function NotFound() {
  return (
          <>
              <div className="showcase bg-primary">
                  <main className="section_container">
                      <h1 className="heading text-secondary">That would be frustating...</h1>
                      <p className="text-30-semibold text-white mb-4">But sorry, we cannot find this page...</p>
                  </main>
              </div>
              <div className="section_container text-center">
                <div className="text-center">
                    <Image src="/404.png" width={250} height={250} alt="Page not found" />
                </div>
              </div>
          </>
      )
}
