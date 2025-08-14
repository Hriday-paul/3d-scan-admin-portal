"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TermsAndConditionEditor from "./terms-condition";
import PrivacyPolicyEditor from "./privacy-policy";
import EditProfile from "./EditProfile";
const SettingsSections = () => {
  return (
    <>
      <div>
        <Accordion
          defaultValue="editProfile"
          type="single"
          collapsible
          className=" space-y-3"
        >
          <AccordionItem value="editProfile">
            <AccordionTrigger className="bg-ns-light text-ns-title text-lg font-semibold border-none px-6">
              Edit Profile
            </AccordionTrigger>
            <AccordionContent className="mt-3 p-5 rounded-lg border-none shadow-none">
              <EditProfile />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="policy">
            <AccordionTrigger className="bg-ns-light text-ns-title text-lg font-semibold border-none px-6">
              Privacy Policy
            </AccordionTrigger>
            <AccordionContent className="mt-3 p-5 rounded-lg border-none shadow-none">
              <PrivacyPolicyEditor />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="terms">
            <AccordionTrigger className="bg-ns-light text-ns-title text-lg font-semibold border-none px-6">
              Terms & Condition
            </AccordionTrigger>
            <AccordionContent className="mt-3 p-5 rounded-lg border-none shadow-none">
              <TermsAndConditionEditor />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default SettingsSections;
