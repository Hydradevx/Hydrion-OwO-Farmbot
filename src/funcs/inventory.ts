import logger from "../utils/logger";

let gem_1 = true;
let gem_3 = true;
let gem_4 = true;
let star_ = true;

export async function filtergem(m: any) {
  if (!gem1.some((gem) => m.content.includes(gem)) && gem_1) {
    equip(1);
  }
  if (!gem3.some((gem) => m.content.includes(gem)) && gem_3) {
    equip(3);
  }
  if (!gem4.some((gem) => m.content.includes(gem)) && gem_4) {
    equip(4);
  }
  if (!star.some((gem) => m.content.includes(gem)) && star_) {
    equip(2);
  }
}

let gem1 = [
  "<:cgem1:492572122120585240>",
  "<:ugem1:492572122514980864>",
  "<:rgem1:492572122888011776>",
  "<:egem1:492572122477101056>",
  "<:mgem1:492572122590478356>",
  "<a:lgem1:492572124251422720>",
  "<a:fgem1:492572124070936586>",
];

let gem3 = [
  "<:cgem3:510366792024195072>",
  "<:ugem3:510366792095367189>",
  "<:rgem3:510366792653340674>",
  "<:egem3:510366792800272394>",
  "<:mgem3:510366792447819777>",
  "<a:lgem3:510366794729652224>",
  "<a:fgem3:510366794792566785>",
]

let gem4 = [
  "<:ugem4:510366764249382922>",
  "<:rgem4:510366763884478464>",
  "<:egem4:510366763972558848>",
  "<:mgem4:510366763993661440>",
  "<a:lgem4:510366765826572295>",
  "<a:fgem4:510366765340033025>",
]

let star = [
  "<:cstar:1101731000721096744>",
  "<:ustar:1101731011236220998>",
  "<:rstar:1101731009684328479>",
  "<:estar:1101731002021330974>",
  "<:mstar:1101731007918526524>",
  "<a:lstar:1101731005473230880>",
  "<a:fstar:1101735557001908274>",
]

async function equip(gem_type: number) {
  
}
