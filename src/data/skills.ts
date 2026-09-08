export type SkillItem = {
    name : string;
    reason : string;
};

export type SkillCard = {
    id : string;
    label : string;
    items : SkillItem[];
};

