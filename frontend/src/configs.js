const URI_USER_SVC = process.env.URI_USER_SVC || "http://localhost:8000";
const URL_MATCHING_SVC =
  process.env.URL_MATCHING_SVC || "http://localhost:8001";

const PREFIX_USER_SVC = "/api/user";
const CANEL_MATCH_API_ROUTE = "/api/matching/cancel_find";

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;
export const URL_CANCEL_MATCH = URL_MATCHING_SVC + CANEL_MATCH_API_ROUTE;
