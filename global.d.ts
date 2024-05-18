// type DefaultWeapons = Record<
//   string,
//   Record<
//     string,
//     string
//     | Record<
//         string,
//         string | Record<string, string | Record<string, string>[]>[]
//       >[]
//   >[]
// >;




// To parse this data:
//
//   import { Convert, DefaultWeapons } from "./file";
//
//   const defaultWeapons = Convert.toDefaultWeapons(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

interface DefaultWeapons {
    categories: DefaultWeaponsCategory[];
}

interface DefaultWeaponsCategory {
    category?:    string;
    items?:       Item[];
    subCategory?: string;
    categories?:  CategoryCategory[];
}

interface CategoryCategory {
    name:  string;
    items: Item[];
}

interface Item {
    name:    string;
    skinUrl: string;
}



