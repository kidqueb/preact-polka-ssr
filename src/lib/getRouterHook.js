import useLocation from "wouter-preact/use-location"
import useStaticLocation from "wouter-preact/static-location"

export default (req = {}) => {
  if (typeof window !== undefined) return useLocation
  return useStaticLocation(req.url)
}