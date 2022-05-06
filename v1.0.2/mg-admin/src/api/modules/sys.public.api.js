
import {get, post} from "@/api/http";

export const getOneSentence= (data) =>
  get("/sentence/api/word.php?m=json", data);

