import OpenAI from "openai";

const fallbacks = [
  {
    keywords: ["water", "h2o", "ice", "steam"],
    response: "Water (H2O) is a polar inorganic compound. Each molecule consists of one oxygen atom covalently bonded to two hydrogen atoms. Due to its polar nature and ability to form hydrogen bonds, water has a high specific heat capacity, high surface tension, and is known as the 'universal solvent'. It is essential for all known forms of life."
  },
  {
    keywords: ["carbon dioxide", "co2", "dry ice"],
    response: "Carbon Dioxide (CO2) is a chemical compound composed of one carbon atom covalently double-bonded to two oxygen atoms. It is a gas at room temperature and is vital for photosynthesis in plants. It also acts as a greenhouse gas in the Earth's atmosphere, trapping heat."
  },
  {
    keywords: ["salt", "nacl", "sodium chloride"],
    response: "Sodium Chloride (NaCl), commonly known as table salt, is an ionic compound. It consists of sodium (Na+) and chloride (Cl-) ions organized in a cubic crystal lattice. It is formed through ionic bonding, where sodium transfers an electron to chlorine, resulting in strong electrostatic attraction."
  },
  {
    keywords: ["acid", "base", "ph", "alkali", "neutralize", "neutralisation"],
    response: "Acids are substances with a pH less than 7 that donate hydrogen ions (H+) in aqueous solutions (e.g., Hydrochloric Acid, HCl). Bases are substances with a pH greater than 7 that accept hydrogen ions or donate hydroxide ions (OH-) (e.g., Sodium Hydroxide, NaOH). A pH of 7 is neutral. Mixing an acid and a base results in a neutralization reaction, producing salt and water."
  },
  {
    keywords: ["periodic table", "element", "atomic number"],
    response: "The Periodic Table organizes all known chemical elements by ascending atomic number (number of protons). Elements are arranged in horizontal rows called 'periods' and vertical columns called 'groups'. Elements in the same group share similar chemical properties and valence electron configurations."
  },
  {
    keywords: ["bond", "covalent", "ionic", "metallic"],
    response: "Chemical bonding is how atoms connect to form molecules or lattices. There are three primary types:\n1. Covalent Bonding: Atoms share electron pairs (e.g., H2O, CO2).\n2. Ionic Bonding: Electrons are transferred from a metal to a non-metal, creating charged ions that attract (e.g., NaCl).\n3. Metallic Bonding: Electrons are shared in a 'sea' of delocalized electrons among metal atoms."
  },
  {
    keywords: ["photosynthesis", "glucose", "plant"],
    response: "Photosynthesis is the chemical process where plants convert carbon dioxide (CO2) and water (H2O) into glucose (C6H12O6) and oxygen (O2) using solar energy captured by chlorophyll. The chemical equation is:\n6CO2 + 6H2O + Light Energy -> C6H12O6 + 6O2"
  },
  {
    keywords: ["organic", "alkane", "alkene", "hydrocarbon"],
    response: "Organic chemistry is the study of carbon-based compounds. Hydrocarbons are organic compounds consisting entirely of hydrogen and carbon. They include:\n- Alkanes: Single carbon-carbon bonds (saturated, e.g., Methane, Propane).\n- Alkenes: At least one double carbon-carbon bond (unsaturated, e.g., Ethene).\n- Alkynes: At least one triple carbon-carbon bond (e.g., Ethyne)."
  },
  {
    keywords: ["quantum", "orbital", "schrodinger", "electron cloud"],
    response: "Quantum Chemistry applies quantum mechanics to chemical systems. Unlike classical models, electrons are not in fixed orbits but exist in 'orbitals' (electron clouds) representing the probability distribution of finding an electron. The wave function of these electrons is described by the famous Schrödinger Equation."
  },
  {
    keywords: ["reaction", "exothermic", "endothermic", "catalyst"],
    response: "A chemical reaction reorganizes chemical bonds to transform reactants into products. \n- Exothermic reactions release energy, usually as heat (e.g., combustion).\n- Endothermic reactions absorb energy (e.g., photosynthesis).\n- A Catalyst speeds up the reaction rate by lowering the activation energy without being consumed."
  }
];

export async function askAI(question, customApiKey) {
  const envApiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const apiKey = customApiKey || envApiKey;

  if (!apiKey) {
    // Look for matching keywords for offline help
    const cleanQuestion = question.toLowerCase();
    for (const item of fallbacks) {
      if (item.keywords.some(keyword => cleanQuestion.includes(keyword))) {
        return `[Offline Mode] ${item.response}`;
      }
    }
    
    return `[Offline Mode] Chemistry is the branch of science concerned with the substances of which matter is composed, the investigation of their properties and reactions, and the use of such reactions to form new substances.

Please configure your OpenRouter API Key in the box below to activate full AI Tutor features!`;
  }

  try {
    const client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });

    const completion = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a smart chemistry AI tutor helping students learn easily.",
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return `OpenRouter API Error: ${error.message || "Failed to fetch response"}. Please check your API key validity.`;
  }
}