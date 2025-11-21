import PietroImg from "../../public/img/Pietro.jpg";
import RaulImg from "../../public/img/Raul.jpg";
import RyanImg from "../../public/img/Ryan.jpg";

export default function Integrantes() {
  const integrantes = [
    {
      nome: "Pietro Donella Salomão",
      rm: "561722",
      github: "https://github.com/PietroDonella",
      linkedin: "https://www.linkedin.com/in/pietro-donella-salom%C3%A3o-2a3502367/",
      img: PietroImg,
    },
    {
      nome: "Raul Rezende Iemini Aguiar",
      rm: "564002",
      github: "https://github.com/Raul-Rezende",
      linkedin: "https://www.linkedin.com/in/raul-iemini/",
      img: RaulImg,
    },
    {
      nome: "Ryan Vetoriano",
      rm: "565667",
      github: "https://github.com/ryanvetoriano",
      linkedin: "https://www.linkedin.com/in/ryanvetoriano/",
      img: RyanImg,
    },
  ];

  return (
    <main className="p-4 sm:p-6 lg:p-10 text-[#02353C]">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left text-[var(--text-primary)]">
        Contato dos Integrantes
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {integrantes.map((i, index) => (
          <div
            key={index}
            className="
              bg-white shadow-lg rounded-2xl p-6 border border-[#3FD0C9]/40
              hover:shadow-xl transition
            "
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden border-4 border-[#3FD0C9]">
              <img
                src={i.img}
                alt={i.nome}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-lg sm:text-xl font-semibold text-center mt-4">
              {i.nome}
            </h2>

            <p className="text-center text-sm mt-1 opacity-70">
              RM: {i.rm}
            </p>

            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <a
                href={i.github}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  px-4 py-2 rounded-full bg-gradient-to-r 
                  from-[#2EAF7D] to-[#3FD0C9] text-white font-medium
                  hover:opacity-90 transition text-center
                "
              >
                GitHub
              </a>

              <a
                href={i.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  px-4 py-2 rounded-full bg-gradient-to-r 
                  from-[#0077B5] to-[#00A0DC] text-white font-medium
                  hover:opacity-90 transition text-center
                "
              >
                LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
