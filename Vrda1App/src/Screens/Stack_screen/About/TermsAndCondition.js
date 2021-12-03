import React from "react";
import {SafeAreaView, Text, View, useWindowDimensions, ScrollView} from "react-native";
import RenderHtml from 'react-native-render-html';


const TermsAndCondition = () =>{
    const { width } = useWindowDimensions();
    const source = {
        html: `
    <style>
        .terms_points {
            width: 100%;
            display: block;
        }
        .terms_points_sub_level1 {
            width: 100%;
            display: block;
            padding-left: 14px;
        }
        .terms_points_sub_level2 {
            width: 100%;
            display: block;
            padding-left: 20px;
        }
        .terms_points strong, .terms_points_sub_level1 strong, .terms_points_sub_level2 strong {
            margin-right: 6px;
        }
        .terms_points_sub_level1 p, .terms_points_sub_level2 p {
            margin-bottom: 14px;
        }
    </style>
    <div class="row">
        <div class="col-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-header">
                    <h4 class="card_heading pt-0 pb-0">VRDa1 TERMS OF USE</h4>
                </div>

                <div class="card-body">
                    <p>Prelude/Preface/Foreword: The following terms of use (hereinafter referred to as ‘terms’) constitute an agreement between VRDa1, having its registered office at</p>
                    <hr>
                    <p>(hereinafter referred to as ‘VRDa1’ or ‘we’), conducting its business through its website (hereinafter referred to as ‘website’ and includes products and services on offer) and all the people who sign up (hereinafter referred to as ‘customers’ or ‘you’) on VRDa1’s website, and effectively rescinds all previous agreements between VRDa1 and the existing customers, whether written or oral, except those provided in these terms. All those signing up subsequently will be bound by the terms.</p>
                    <p>The use of the term ‘parties’, throughout the terms, would jointly mean ‘VRDa1’ and ‘customers’.</p>
                    <p>By logging into the website and using various services and products on offer, you agree that you have read and understood the terms and also agree to be bound by the terms. By agreeing to the terms of the website you acknowledge that, as per all applicable laws, you have the authority to enter into a lawful agreement by accepting its terms. without fully agreeing to the terms, customers are not permitted to use the website and avail any of the services and/or products offered thereon.</p>

                    <h3>Terms of Use:</h3>
                    <div class="row">
                        <div class="col-12">
                            <div class="terms_points">
                                <p>
                                    <strong>1)</strong>
                                    Whenever one of the following terms would appear in the terms of use for signing up and using the website and availing services and/or products offered on the website from time to time, the meaning of these terms as described and explained in the following paragraphs would take precedence over any other meaning of such terms.
                                </p>
                                <div class="terms_points_sub_level1">
                                    <p>
                                        <strong>1.1</strong> VRDa1 website: The website owned and being operated by VRDa1 would mean all websites/webpages and subdomains currently owned/held by VRDa1 or which might be acquired/purchased in the future by VRDa1. Following is a non-exhaustive indicative list of the same:
                                    </p>

                                    <div class="terms_points_sub_level2">
                                        <p>
                                            <strong>1.1.1</strong> https://VRDa1.com
                                        </p>
                                        <p>
                                            <strong>1.1.2</strong> https://VRDa1.com/
                                        </p>
                                        <p>
                                            <strong>1.1.3</strong> https://support.VRDa1.com/en/support/home
                                        </p>
                                    </div>

                                    <p>
                                        <strong>1.2</strong> VRDa1 Affiliates: For the intent and purposes of the terms of use, the following is a list of VRDa1 affiliates and is subject to change:
                                    </p>
                                    <p>
                                        <strong>1.3</strong> Under the terms of use of VRDa1, any person/party that has not agreed to the terms of use of VRDa1 and has not signed the same would be considered as a third party.
                                    </p>
                                    <p>
                                        <strong>1.4</strong> Chargeback: It is considered a forced transaction reversal that only a customer can initiate and this kind of forced transaction reversal can be effected only through a bank or a payment gateway.
                                    </p>
                                </div>

                                <p>
                                    <strong>2)</strong>
                                    Website Registration: In order to avail of the services and products offered by VRDa1 or its affiliates, a person must get registered with VRDa1 on its website. It is the sole responsibility of the customers to protect their usernames and passwords. VRDa1 will not be held responsible if a transaction is made on its website by using a customer’s username and password and therefore, it is understood that a customer who signs the terms of use and agrees to abide by these terms absolves VRDa1 of any responsibility/liability arising from exposure of their username and password to any other customer or any third party.
                                </p>
                                <p>
                                    <strong>3)</strong>
                                    Use of the website: VRDa1 offers its services and products through its website. VRDa1 provides unrestricted access of the website to any person who signed up on the website and is authorised to avail the services and products offered through the website. The website can be accessed from any territorial or legal jurisdiction throughout the world, however, handling of any risks involved in using the website would be the sole responsibility of the customers. Moreover, customers alone would be responsible for compliance with any local or international laws, regulations and sanctions.
                                </p>
                                <p>
                                    <strong>4)</strong> Regulated Use of VRDa1 Website:
                                </p>

                                <div class="terms_points_sub_level1">
                                    <p>
                                        <strong>4.1</strong> The website can be accessed, with or without using VPN, from any part of the world, however, it is of utmost importance to mention that VRDa1 does not provide any services and/or products whatsoever to the residents and/or companies of those countries/states which have been sanctioned by the law of their land / country residence
                                        , barring any business activity with the residents and/or companies of the sanctioned countries or state entities. The website will not provide its services and products in such jurisdictions where it has been prohibited from providing its services and products under relevant local laws. Before customers sign up for availing the services and/or products offered on the website, customers are expected to exercise due diligence as to whether the website is authorised to offer its services and/or products in a particular territorial and/or legal jurisdiction as VRDa1 is not obliged to provide a list of sanctioned countries and respective residents and/or companies.
                                    </p>
                                    <p>
                                        <strong>4.2</strong> If a customer happens to be the resident of such a country/state that has been sanctioned by USA V1 Horizons, Inc. or where the use of services and/or products of VRDa1 have been restricted under any law for the time being in force, VRDa1 would have legal right to cancel the provision of its services and/or products to its customers who are residents of sanctioned countries/states as mentioned above, and neither VRDa1 will have any obligations towards such customers nor VRDa1 would be held liable for the restriction/suspension of its services to the residents of sanctioned countries/states as mentioned above.
                                    </p>
                                    <p>
                                        <strong>4.3</strong> Under the 5th EU Anti-laundering directive (5AMLD) it has been made mandatory to all such companies/organisations who deal with consumer funds to perform KYC (know your customer) activity to know each and every customer. For the purposes of KYC, VRDa1 has hired the services of ---------- (www.--------------.com), a third-party verification company, and bears most of the cost incurred on KYC, however, a small part of KYC payments have been transferred to the customers and each customer is obliged to pay -------- a paltry amount of $20. This one-time payment would be non-refundable and non-transferable.
                                    </p>
                                </div>

                                <p>
                                    <strong>5)</strong> General Duties of VRDa1:
                                </p>
                                <div class="terms_points_sub_level1">
                                    <p>
                                        <strong>5.1</strong> It would be the first and foremost duty of VRDa1 to put all its efforts into providing its customers with the services of the highest quality within a certain time frame through its website and that would ensure the smooth and hassle-free running of the website to the satisfaction of the customers.
                                    </p>
                                    <p>
                                        <strong>5.2</strong> Though, VRDa1 undertakes to provide the best of services to its customers through its website, in case of any deficient services, a customer has the right to lodge a complaint with VRDa1 through its website. However, the lodging of any complaint has to be within the ambit of the terms and conditions and other governing policies updated from time to time as agreed between the parties.
                                    </p>
                                    <p>
                                        <strong>5.3</strong> VRDa1 will have the responsibility to provide quick and timely customer support services and will take all necessary steps to ensure the satisfaction of its valued customers.
                                    </p>
                                    <p>
                                        <strong>5.4</strong> VRDa1 would be obliged to intimate its customers regarding any change in the terms of use which may be brought from time to time through the website, however, it would be the responsibility of the customers to keep themselves abreast of such changes and once VRDa1 updates the terms of use, VRDa1 will not be held responsible for lack of knowledge of such updated terms of use on the part of any of its customers.
                                    </p>
                                </div>

                                <p>
                                    <strong>6)</strong> Customer support: In case a customer has a customer support query, for example, an account-related and/or payment-related query, such customer must submit a token to the customer services department through the customer service contact form that is available on the website. VRDa1 will take all necessary steps to ensure that customer support queries are responded to within a reasonable time frame, however, VRDa1 makes no promise as to the fulfillment of customer support queries within a particular time span and cannot be held liable for any inadvertent delay in responding to a customer support query.
                                </p>
                                <p>
                                    <strong>7)</strong> Disclaimer and Limit to Liability of VRDa1:
                                </p>

                                <div class="terms_points_sub_level1">
                                    <p>
                                        <strong>7.1</strong> You as a customer understand and agree that the services and/or products offered by VRDa1 are being offered on ‘as is’, ‘with all faults’ and ‘as available basis. It is also assumed that you agree and acknowledge that the use of the VRDa1 website or the services and/or products being offered are at risk. You also acknowledge that all warranties without any limitation including the implied warranties of merchantability, fitness for a particular purpose, for the title and non-infringement are fully disclaimed and excluded. It is further reiterated that no representations, warranties or guarantees whatsoever are made by VRDa1 whether express or implied and VRDa1 expressly disclaims any and all representations and warranties as to the ………….
                                    </p>

                                    <div class="terms_points_sub_level2">
                                        <p>
                                            <strong>7.1.1</strong> Accuracy, adequacy, reliability, completeness, suitability or applicability of the information, the content, data, products and/or services, merchantability or any warranty for fitness for a particular purpose.
                                        </p>
                                        <p>
                                            <strong>7.1.2</strong> That the services provided by VRDa1 will be interrupted, timely, secure and error-free or VRDa1 will correct all deficiencies, errors, defects or non-conformities within a reasonable time frame.
                                        </p>
                                        <p>
                                            <strong>7.1.3</strong> VRDa1 will make every effort to ensure that the quality of any services, data, content, information or other material on the website meets the expectations or requirements of the customers.
                                        </p>
                                        <p>
                                            <strong>7.1.4</strong> VRDa1 undertakes to correct any error(s) found on the website. customers are encouraged to point out errors by submitting a token to the customer services department through the customer service, customer should send an email to support@vrda1.net with details of the error to attempt a resolution by the back office support.
                                        </p>
                                        <p>
                                            <strong>7.1.5</strong> Warranties against infringement of any third party intellectual property or proprietary rights; or other warranties relating to performance, non-performance, or other acts or omissions of the VRDa1, its officers, directors, employees, affiliates, agents, licensors, or suppliers etc.
                                        </p>
                                        <p>
                                            <strong>7.1.6</strong> VRDa1 does not extend a warranty of any kind whatsoever that any of the software being employed or licensed in relation to the services and/or products being offered on the website will be compatible with any third-party software or devices. VRDa1 also does not warrant that the operation of the services and/or products being offered on the website will not damage and disrupt other software or hardware. In case it is claimed that there has been any damage to any software, hardware/devices, VRDa1, its affiliates, successors, and assignees and each of their respective investors, directors, officers, employees, agents and suppliers (including distributors and content licensors) will not be liable to any direct, indirect, punitive, incidental, special or consequential damages provided in the contract, tort, strict liability, or other legal theory, arising out of the alleged damage or in any way whatsoever connected with the use of VRDa1 website or the services and/or products on offer on the website. Furthermore, VRDa1 will not be held responsible for any kind of damages by the customers or any third party even if VRDa1 have been advised of the possibility of damages.
                                        </p>
                                    </div>

                                    <p>
                                        <strong>7.2</strong> VRDa1, its officers, managers, members, employees, attorneys and agents shall not be liable, jointly or severally, under any circumstances whatsoever for any direct, indirect, special, incidental or consequential damages of any kind arising out of, but not limited to, negligence of any nature. This provision encompasses, but not limited to, use of services and/or products offered by VRDa1, data of profit and loss or any other data maintained by VRDa1 and any theory of liability which may arise out of or in connection with the ability or inability of VRDa1, its officers, managers, members, employees, attorneys and agents or anyone hired or employed by VRDa1 regarding the implementation of the terms of use and operations of its website.
                                    </p>
                                    <p>
                                        <strong>7.3</strong> VRDa1 is neither a bank nor trading organisation, hedge fund, brokerage or an investment company. We are Loyalty Services Provider and online education platform. VRDa1 is not a FCA-regulated or DSA registered entity and has not acquired any other financial certification or any insurance policy setup because being an online education provider, VRDa1 does not require any of the above credentials. Being an online education provider, we do not have investors, therefore, we are not supported by any investment that excludes reinvestment and any ROI (return on investment). We also do not have any deposits and hence there is no possibility of any guarantee of percentage of profit shared.
                                    </p>
                                    <p>
                                        <strong>7.4</strong> In case of such an event that any exclusion contained herein is held to be invalid for any reason whatsoever, VRDa1 or any of its affiliates, officers, directors or employees are held liable for loss or damages, any such liability to be discharged by VRDa1 or any of its affiliates, officers, directors or employees shall be limited to, and shall not exceed in any case, the account set-up charges paid by the concerned customer.
                                    </p>
                                    <p>
                                        <strong>7.5</strong> When you buy a VRDa1 Package, you get access to VRDa1 Academy where you learn about Real Estate and Blockchain. You also get VREIT; the number of VREIT depends on its value in our system, at the time of purchase. This includes all revenue share and commissions (as shown in the "Total Earning" box in the Back-Office
                                    </p>
                                    <p>
                                        <strong>7.6</strong>
                                    </p>
                                    <p>
                                        <strong>7.7</strong> When you buy a VRDa1 Package, you get access to VRDa1 Academy where you learn about REIT and Cryptocurrency. You also get VCoins (V); the number of V depends on its value in our system, at the time of purchase. This includes all Profit share and commissions (as shown in the "Total Earning" box in the Back-Office.
                                    </p>
                                </div>

                                <p>
                                    <strong>8)</strong> Limitation on bringing up a claim: The parties i.e. VRDa1 and the customers agree that any cause of action arising out of or related to the use of VRDa1 website or the services and/or products offered thereon must commence within 3 months from the date of such cause of action, otherwise such cause of action will be barred permanently.
                                </p>
                                <p>
                                    <strong>9)</strong> Reserved Right to Modify Terms: Customers understand and agree that VRDa1 has the sole discretion to make changes, modifications, amendments, alterations or deletions to any provision, fully or partially, of the terms of use at any time, and that the customers will have no legal right to block or restrict any changes, modifications, amendments, alterations or deletions introduced by VRDa1. As it is expected that there would be frequent updates to the terms of use, it is the responsibility of the customers to visit the ‘terms of use’ section on the website regularly and identify the changes introduced by VRDa1 because every customer is bound to follow the terms of use and any changes, modifications, amendments, alterations or deletions introduced therein. When some material changes would be made by VRDa1, we shall intimate the customers through the website in the form of some notice or any other appropriate form under the circumstances, e.g., by displaying a prominent notice/banner on the website, or by intimating the customers through their email addresses registered with VRDa1. In some certain cases, changes would be announced in advance and customers’ continued use of the services and/or products on the website after the changes have come into effect would be deemed as acceptance of the changes on the part of the customers. Therefore, customers are advised in their best interests that they should pay careful attention to all the notices displayed on the website and any communication made with them by VRDa1. If a customer refuses to accept the changed/amended terms of use and wishes to discontinue the use of services and/or products on the website, such a customer has the discretion to terminate their account by contacting VRDa1.
                                </p>
                                <p>
                                    <strong>10)</strong>
                                    Intellectual Property Rights: Unless otherwise specified, all materials appearing on the Website including the text, site design, logos, graphics, icons and images, trademarks, the selection, assembly and arrangement thereof and other intellectual property assets as well are the sole property of VRDa1. The customers have been authorised to use the content available on the website only for the purposes of shopping their desired services and/or products and placing orders of the same and for no other purpose(s). No one is authorised to copy, reproduce, modify, republish, upload, post, transmit or distribute any material from the website in any form or by any means without prior written permission of VRDa1. All rights not expressly granted in writing are reserved by VRDa1. Any unauthorised use of the materials displayed and appearing on the website will constitute an infringement of intellectual property rights, trademark and an offence under local and international laws and would result in civil and/or criminal penalties.
                                </p>
                                <p>
                                    <strong>11)</strong> Payment Methods: It must be noted that VRDa1 accepts payments through a wide range of payment methods and customers will have the discretion to choose any of the payment methods made available by VRDa1 at the time of registration on the website. However, it cannot be ensured that all payment methods or gateway options available at the time of registration on the website would remain available to the customers. The payment methods or gateway options are subject to change at any time, therefore, we cannot guarantee that a particular payment method or gateway would be available at all the time on our website.
                                </p>
                                <p>
                                    <strong>12)</strong> Links to Other Websites: The website operated by VRDa1 may contain links or pointers to other sites on the web that are owned and operated by third parties. You acknowledge that VRDa1 is not responsible and cannot be held responsible for the operation(s) and/or content of the third-party websites.
                                </p>
                                <div class="terms_points_sub_level1">
                                    <p>
                                        <strong>12.1</strong> While surfing the website, if you happen to click on a link within the VRDa1 website, VRDa1 may not warn you that you have left the VRDa1 website and are then subject to the terms and conditions of the third party website, including their privacy policy, and what kind of risks you may be exposed to while surfing those particular third party websites. You are advised to carefully read the terms and conditions of that particular third-party website before disclosing your confidential information or entering into any transaction thereon. You must understand that the terms of use of the VRDa1 website do not govern your use of third-party websites.
                                    </p>
                                    <p>
                                        <strong>12.2</strong> VRDa1 takes no responsibility for the content displayed by third-party websites even if you approach a particular third-party website by clicking links of such websites on the VRDa1 website or even if it links to the VRDa1 website. It is understood that you acknowledge and agree that VRDa1 cannot be held liable for the content and material(s) presented on third-party websites. VRDa1 is responsible only for the content displayed on its own website.
                                    </p>
                                </div>

                                <p>
                                    <strong>13)</strong> Privacy: Before making a purchase on the VRDa1 website, you will provide your personal and financial/banking information that may include the following: your name, email address, credit card information, postal address, phone number and password. All such information would be required to process your online orders on the website and to keep you updated regarding your orders and to further personalise your shopping experience by offering customised shopping items to you in the future. VRDa1 pledges to keep your personal information private and secure through the use of updated technology and practices. VRDa1 will exercise due diligence and take all necessary steps to ensure the security of personal and financial information. VRDa1 has secured the top of the line services by hiring secure servers for the purpose of protecting your information by using advanced encryption techniques and firewall technologies and other such measures as listed in VRDa1’s general privacy policy.
                                </p>
                                <div class="terms_points_sub_level1">
                                    <p>
                                        <strong>13.1</strong> If you are interested in knowing more about VRDa1’s privacy policy, you are advised to refer to the documents which have been mentioned below and these documents form an integral part of the terms of our privacy policy.
                                    </p>
                                    <p>
                                        <strong>13.2</strong> VRDa1 General Privacy Policy (Available at – www.vrda1.com)
                                    </p>
                                    <p>
                                        <strong>13.3</strong> VRDa1 GDPR Privacy Policy (Available at – www.vrda1.com)
                                    </p>
                                </div>

                                <p>
                                    <strong>14)</strong> VRDa1 Cancellation Policy: VRDa1’s cancellation policy is an integral part of these terms of use and are subject to continuous changes. Updated versions of our cancellation policy can be found on our website and customers are responsible for keeping themselves updated of any changes in the cancellation policy.
                                </p>
                                <p>
                                    <strong>15)</strong> VRDa1 Refund Policy:  VRDa1’s refund policy is an integral part of these terms of use and are subject to continuous changes. Updated versions of our refund policy can be found on our website and customers are responsible for keeping themselves updated of any changes in the refund policy.
                                </p>
                                <p>
                                    <strong>16)</strong> Inaccuracies: In case that wrong pricing information has been displayed on the website inadvertently and has been caused by typographical error or error in pricing information received from our suppliers, VRDa1 shall have the right to refuse or cancel any orders that have been placed based on erroneous pricing information. VRDa1 shall exercise its discretion to refuse or cancel all such orders that have been placed as a result of erroneous pricing information, even though such orders have been confirmed by VRDa1 and the customer’s credit card has been charged. VRDa1’s refund and cancellation policies contain detailed information regarding inaccuracies and the customers interested in finding out fine prints are advised to refer to refund and cancellation policies.
                                </p>
                                <p>
                                    <strong>17)</strong> Site Users’ Conduct: Anyone desirous of becoming a customer of VRDa1 must have attained the minimum required age of eighteen (18) years as required by the applicable laws and regulations. Furthermore, a prospective customer must be eligible to enter into a legally enforceable agreement/contract recognised by their local laws and regulations. While using the VRDa1 website and surfing through its content, users are not supposed and allowed to:
                                </p>
                                <div class="terms_points_sub_level1">
                                    <p>
                                        <strong>17.1</strong> Upload, post, e-mail, or transmit any:
                                    </p>

                                    <div class="terms_points_sub_level2">
                                        <p>
                                            <strong>17.1.1</strong> Any such content that is deemed unlawful, threatening, abusive, harassing, tortuous, defamatory, vulgar, obscene, pornographic, libelous, invasive of anyone’s privacy, hateful, or racially, ethnically, or otherwise illegal or objectionable.
                                        </p>
                                        <p>
                                            <strong>17.1.2</strong> Any such content that does not give rights to the users to transmit the same under any law for the time being in force, or under contractual or fiduciary relationships (such as inside information, proprietary, and confidential information learned or disclosed as part of employment relationships or under non-disclosure agreements.
                                        </p>
                                        <p>
                                            <strong>17.1.3</strong> Unsolicited or unauthorised advertising, promotional material, junk mail or spam, chain letter, pyramid schemes or any other form of solicitation.
                                        </p>
                                        <p>
                                            <strong>17.1.4</strong> Any such material that contains software viruses or any other computer code, files, or programs designed such as to cause interruption, destruction of the functionality of any computer software and/or hardware and limits the functionality of the same, or disrupts telecommunication equipment.
                                        </p>
                                    </div>

                                    <p>
                                        <strong>17.2</strong> Use VRDa1 website for any illegal activity or unlawful purpose(s).
                                    </p>
                                    <p>
                                        <strong>17.3</strong> Interfere with or disrupt any of the services provided and/or content displayed on VRDa1 website.
                                    </p>
                                    <p>
                                        <strong>17.4</strong> Intentionally or unintentionally violate any local, state, national or international law for the time being force.
                                    </p>
                                    <p>
                                        <strong>17.5</strong> If a member is found to have engaged in any such activity that may cause a conflict of interest with respect to the services and/or products of VRDa1, VRDa1 will have the right to block or terminate IDs of such member(s) and cease their funds without notice. VRDa1 will be the sole authority to determine whether the activities of any member(s) constitute conflict of interest with respect to its own services.
                                    </p>
                                </div>

                                <p>
                                    <strong>18)</strong> Disclaimer of Warranty: VRDa1 refuses to acknowledge all such warranties, whether expressed or implied including but not limited to warranties of merchantability, fitness for a particular purpose, or other violations of rights to the full permissible extent being pursuant to the applicable laws. No liability or responsibility would be assumed for any error(s) or omission(s) of the content provided on VRDa1 website, any defect(s) corrected, error(s), defect(s), failure(s), delay(s), malfunction(s) or interruption(s) in the delivery of any content on the VRDa1 website, either online or offline. VRDa1 does not, in any manner whatsoever, warrant or represent the use or results of the use of the services or material on the VRDa1 website in terms of correctness, accuracy, reliability or any other measure. The users/clients or customers will have to bear the cost of servicing, repair or correction themselves in entirety and will not either hold VRDa1 responsible for any costs incurred on such servicing, repair, or correction nor will the users/clients or customers ask VRDa1 for compensation in any form against the costs incurred on any servicing, repair or correction.
                                </p>
                                <p>
                                    <strong>19)</strong> Representation by Customer:
                                </p>
                                <div class="terms_points_sub_level1">
                                    <p>
                                        <strong>19.1</strong> By signing up on the VRDa1 website and agreeing to the terms of use, a customer affirms that he/she is legally eligible to enter into a contract as per the applicable law(s). This signing up on the VRDa1 website and agreeing to the terms of use also signifies that the customer is entering into a lawful legal contract and such signing up and agreeing to the terms of use does not constitute a transgression of any applicable law.
                                    </p>
                                    <p>
                                        <strong>19.2</strong> The customer acknowledges that all the information provided by them at the time of signing up and during the purchase of any service(s) is absolutely correct. In the event that a customer inadvertently provides wrong information, or comes across their personal information that is not correct, it is the sole responsibility of the concerned customer to get such wrong information corrected at the earliest. In case some inaccuracies emerge as a result of incorrect information provided by the customers, then the customers will not hold VRDa1 responsible for such inaccuracies.
                                    </p>
                                    <p>
                                        <strong>19.3</strong> The customers signing up on the VRDa1 website and availing services and/or products offered thereon agree that they shall not copy or duplicate any part of the VRDa1 website or content available on the VRDa1 website in any manner, including but not limited to, screenshots and/or screen recording of the functioning of the VRDa1 website.
                                    </p>
                                    <p>
                                        <strong>19.4</strong> The customers signing up on the VRDa1 website and intending to avail services and/or products offered thereon solemnly declare and affirm that they have read all the terms of use and applicable policies before actually indulging in using the services an/or products offered by VRDa1 through it website and acknowledge that the terms of use are in full compliance of the applicable laws, and also undertake to abide by the terms of use for all times to come or as long as they remain a customer of VRDa1.
                                    </p>
                                </div>

                                <p>
                                    <strong>20)</strong> Warranties and Indemnification by Customer
                                </p>
                                <div class="terms_points_sub_level1">
                                    <p>
                                        <strong>20.1</strong> The customers signing up on the VRDa1 website and intending to avail services and/or products offered thereon solemnly declare and affirm that they have read all the terms of use and applicable policies before actually indulging in using the services an/or products offered by VRDa1 through it website and acknowledge that the terms of use are in full compliance of the applicable laws, and also undertake to abide by the terms of use for all times to come or as long as they remain a customer of VRDa1. The customers shall indemnify VRDa1 and/or its affiliates if the customers are in breach of any of the representations made above in clause 19 of the term of use.
                                    </p>
                                    <p>
                                        <strong>20.2</strong> In the event that a customer is found to be in breach of the foregoing warranties and other terms of use or if there is a reasonable apprehension of an anticipated breach of any of the foregoing warranties and other terms of use, VRDa1 will have the right to exercise immediately its discretion to suspend any related services if it is deemed necessary by VRDa1 to stop any harm coming to VRDa1 or its business. Besides, VRDa1 will be at liberty to have recourse to any other remedies available at law or in equity.
                                    </p>
                                </div>

                                <p>
                                    <strong>21)</strong> Autonomous Termination Rights of VRDa1: If VRDa1 reasonably believes or comes to a conclusion that a customer was engaged or is engaged in any of the following activities, VRDa1 will have the right to unilaterally terminate or cancel such customer’s services at any time without notice.
                                </p>
                                <div class="terms_points_sub_level1">
                                    <p>
                                        <strong>21.1</strong> Any activities that might bring a bad name to the goodwill, reputation, or business of VRDa1 or damage the goodwill, reputation, or business of VRDa1.
                                    </p>
                                    <p>
                                        <strong>21.2</strong> A customer who has been found to have engaged in misrepresentation or found to have committed fraud relating to the services offered by VRDa1.
                                    </p>
                                    <p>
                                        <strong>21.3</strong> A customer has been charged for criminal misconduct in any territorial or legal jurisdiction for any offense punishable under any law for the time being in force.
                                    </p>
                                    <p>
                                        <strong>21.4</strong> If a customer initiates the option of chargeback for some specific services, which VRDa1 believes is not and cannot be justified.
                                    </p>
                                    <p>
                                        <strong>21.5</strong> Where a customer has been found to be in breach of any other terms enforced by VRDa1 or its terms of use and applicable policies.
                                    </p>
                                    <p>
                                        <strong>21.6</strong> Where a customer violates any of the provisions of clause 17 of the terms of use relating to the conduct of users while using the VRDa1 website.
                                    </p>
                                    <p>
                                        <strong>21.7</strong> Where a customer is found to have violated any of the intellectual property rights enforceable at law of VRDa1, its affiliates, or its business partners.
                                    </p>
                                    <p>
                                        <strong>21.8</strong> Where it is figured out by VRDa1 that a customer is a citizen of any of the restricted countries/states as mentioned in clause 4 of the terms of use.
                                    </p>
                                    <p>
                                        <strong>21.9</strong> A customer furnishing false, inaccurate, misleading, or incomplete information; engaging in any such conduct that would jeopardies or harm any of the rights of interests vested in VRDa1, its website, products, services, or other property; or any violation of the terms of use, can be made grounds for termination without prior notice.
                                    </p>
                                </div>

                                <p>
                                    <strong>22)</strong> Confidentiality and Non-Disclosure: The customers agree to adhere to and abide by the customer confidentiality agreement and non-disclosure agreement (hereinafter referred to as ‘NDA’). The said NDA shall be considered an integral part of the agreement between the parties. The NDA demands that customers will not share any data belonging to VRDa1 or related to its customers and violation of the NDA will result in suspension or termination of a particular customer’s account. By signing up on our website and using services and/or products, you automatically agree that you undertake that you will not share any of the company's information/data or customer’s information/data in any manner whatsoever to any third party. The terms and conditions of NDA are available on the website of VRDa1 for your perusal and customers are expected to carefully read the terms and conditions of the NDA.
                                </p>
                                <p>
                                    <strong>23)</strong> Force Majeure:
                                </p>
                                <div class="terms_points_sub_level1">
                                    <p>
                                        <strong>23.1</strong> Notwithstanding anything contained in the terms of use, VRDa1 shall not be required to provide any services and/or products, in the whole of in part, to the extent that the provision of such services becomes impracticable as a result of a cause or causes that are beyond the reasonable control of VRDa1 and such cause or causes may include fire, flood, storm, earthquake or other acts of nature, riot, war, terrorism, rebellion, or other acts of war or civil unrest, utility outages or interruptions, strike, lockout, any Law, demand or other requirements of any governmental entity, and all other causes outside of VRDa1’s reasonable control. Such cause(s) may also relate to unfeasible technological requirements, hacks, non-availability of certain software or hardware or other unavoidable technological circumstances which do not fall within the purview of VRDa1 to control and manage. VRDa1 will discontinue any such services and/or products, wholly or partly, which become unlawful as a result of the amendment(s) of any applicable local or international laws or constitutes a breach of any agreement with any third party.
                                    </p>
                                    <p>
                                        <strong>23.2</strong> When affected by any such event as mentioned in clause 23.1, VRDa1 shall:
                                    </p>
                                    <div class="terms_points_sub_level2">
                                        <p>
                                            <strong>23.2.1</strong> Notify the customers of the occurrence of such an event at the earliest and explain to the customers in detail the nature of such an event and its ramifications on the provision of services and/or products of VRDa1. VRDa1 will also keep track of the event causing disruption to its services and/or products and, if the circumstances of the event permit, will look to inform its customers as to when the disrupted/suspended services and/or products could be resumed.
                                        </p>
                                        <p>
                                            <strong>23.2.1</strong> Where provision of services and/or products of VRDa1 have been suspended or discontinued due to such cause or causes which are beyond the reasonable control of VRDa1, even in such a case, VRDa1  will make every effort and use all available resources to resume the performance of its obligations under these terms of use as soon as practicable.
                                        </p>
                                    </div>
                                </div>

                                <p>
                                    <strong>24)</strong> No Waiver: Where there has been a delay or even failure in the exercise of any particular right, power, or privilege under any of the terms of use, the same will not be taken as a waiver with respect to that particular right, power or privilege, nor will a single or partial exercise of any particular right, power or privilege under these terms of use preclude the exercise of that particular right, power or privilege or any other right, power or privilege under the terms of use of otherwise.
                                </p>
                                <p>
                                    <strong>25)</strong> Class Action Waiver: Where it has been expressly permitted by any applicable law, customers and VRDa1 agree that each may bring claims against the other only in personal/individual capacity and not as a plaintiff or member of some class or representative action. This clause makes it clear that Neither VRDa1 will bring a claim or action against a number of its customers in a single legal transaction, nor will the customers sue VRDa1 in the form of a group i.e. this clause binds both VRDa1 and the customers not to bring a class-action suit against one another. Furthermore, where a court/judge or an arbitrator is administering legal proceedings for claims initiated by VRDa1 against its customers or vice versa, such court/judge or an arbitrator may not consolidate such legal proceeding of two or more parties’ claims without agreement between VRDa1  and its customer(s) or otherwise preside over any form of a consolidate representation or class proceedings.
                                </p>
                                <p>
                                    <strong>26)</strong> Media Contact: The customers shall not speak, write or interact about VRDa1, its website, its services and/or products, and its affiliates with media including print media, electronic media i.e. television and radio, or any other such forum, social media, without first seeking prior written permission from VRDa1 and shall be responsible for ensuring that such written permission has been given by the competent authority in this regard. Through their interactions with any media, the customers shall not make false claims regarding any of the affairs of VRDa1, its website, its services and/or products and its affiliates, or depict VRDa1, its website, its services and/or products, and its affiliates in a bad light, hamper the reputation and goodwill of VRDa1, its website, its services and/or products and its affiliates, and the trust of VRDa1’s other customers and partners in a negative sense. If a customer makes a public statement, whether written or oral, for which a prior written statement was not expressly given by VRDa1, then this making of such public statement shall be termed as a breach of the terms of use at the option of VRDa1.
                                </p>
                                <p>
                                    <strong>27)</strong> Governing Law of the Terms and Conditions: The law or laws that will govern the terms of use shall be the laws of USA V1 Horizons, Inc. for the time being in force or which will come into force in the future and the rights, powers, and privileges of the parties shall be administered within the purview of the laws mentioned above.
                                </p>
                                <p>
                                    <strong>28)</strong> Arbitration Agreement: In case any dispute arises out of the formation, interpretation, performance, nullification, termination or invalidation of the terms of use, or arising therefrom or related thereto in any manner whatsoever, shall be referred to an arbitrator and adjudicated upon or settled through arbitration in accordance with provisions of the arbitration rules (hereinafter referred to as ‘the rules’) as set forth under the Dubai International Arbitration Centre, by one arbitrator duly appointed by the Chartered Institute of Arbitrators (hereinafter referred to as CIArb’).
                                </p>
                                <div class="terms_points_sub_level1">
                                    <p>
                                        <strong>28.1</strong> Where a dispute arises as mentioned in clause 28 above and has been referred to an arbitrator, the arbitration proceedings shall be administered by CIArb.
                                    </p>
                                    <p>
                                        <strong>28.2</strong> Where a dispute has been referred to an arbitrator under the arbitration rules and proceedings are being administered by CIArb, the language of the arbitration proceedings, including all documentation submitted before the arbitrator, shall be English.
                                    </p>
                                    <p>
                                        <strong>28.3</strong> The law that would govern the arbitration proceedings between/among the parties shall be USA V1 Horizons, Inc.’s Federal Arbitration law.
                                    </p>
                                    <p>
                                        <strong>28.4</strong> The place of the arbitration proceedings shall be USA V1 Horizons, Inc.. The arbitrator appointed by CIArb shall conduct all the proceedings of the dispute in accordance with the rules and conclude the proceedings by making an award and all the proceedings shall take place in USA V1 Horizons, Inc..
                                    </p>
                                    <p>
                                        <strong>28.5</strong> The arbitrator duly appointed by CIArb shall conduct arbitration proceedings in accordance with the rules and shall announce an award with respect to the dispute and the arbitration award by the arbitrator shall be final and binding on both/all parties.
                                    </p>
                                    <p>
                                        <strong>28.6</strong> The arbitration proceedings, administered by a single arbitrator duly appointed by CIArb in accordance with the rules regarding any dispute arising out of formation, interpretation, performance, nullification, termination or invalidation of the terms of use, or arising therefrom or related thereto in any manner whatsoever, including oral hearings, notices, written submissions, interim orders or interim awards and any evidence produced by the parties shall be completely confidential.
                                    </p>
                                </div>

                                <p>
                                    <strong>29)</strong> Jurisdiction: Any dispute, arising out of formation, interpretation, performance, nullification, termination or invalidation of the terms of use, or arising therefrom or related thereto in any manner whatsoever, that is not arbitrable as per the applicable laws shall be adjudicated upon and decided by the relevant courts of that territorial jurisdiction within whose jurisdiction the customer is a lawful resident.
                                </p>
                                <p>
                                    <strong>30)</strong> Entire Agreement: The terms of use offered by VRDa1 at the time of signing up and below mentioned additional documents/policies together constitute the entire understanding and agreement between the parties with respect to the subject hereof and supersedes all prior understandings and agreements, whether oral or written, with respect to such matters, and which the parties duly acknowledge have been merged into such documents, exhibits, schedules, and policies.
                                </p>
                                <div class="terms_points_sub_level1">
                                    <p>
                                        <strong>30.1</strong> VRDa1 Customer Confidentiality and NDA (Available at – www.vrda1.com).
                                    </p>
                                    <p>
                                        <strong>30.2</strong> VRDa1 Refund Policy (Available at – www.vrda1.com).
                                    </p>
                                    <p>
                                        <strong>30.3</strong> VRDa1 Cancellation Policy (Available at – www.vrda1.com).
                                    </p>
                                    <p>
                                        <strong>30.4</strong> VRDa1 GDPR Privacy Policy (Available at – www.vrda1.com).
                                    </p>
                                    <p>
                                        <strong>30.5</strong>  VRDa1Privacy Policy (Available at – www.vrda1.com).
                                    </p>
                                </div>

                                <p>
                                    <strong>31)</strong> Non-Assignability: The agreement formed between the parties, i.e. VRDa1 and the customers, by agreeing to the VRDa1 terms of use and other policies as entered between the parties and subject to changes/amendments as required from time to time, is deemed to be personal in nature and is non-transferable except in certain conditions that shall be provided by VRDa1. Therefore, the customers shall not, without the prior written consent of VRDa1, obtained from a competent authority within VRDa1, assign or transfer any right or obligation hereof to any third party.
                                </p>
                                <p>
                                    <strong>32)</strong> Severability: In the event that any clause or some specific part of a clause of the terms of use is held to be illegal, invalid or unenforceable by any competent authority, or become illegal, invalid or unenforceable due to any amendment in any local or international law, that clause of that specific part of the clause shall, to the extent that becomes illegal, invalid or unenforceable, be given no effect and shall be deemed not to be included in the terms of use. However, where any clause or some specific part of a clause of the terms of use is held to be illegal, invalid or unenforceable, that shall not affect the legality, validity or enforceability of any lawful, valid and enforceable clause of the terms of use.
                                </p>
                                <p>
                                    <strong>33)</strong> Prevailing Language: The terms of use agreed between the parties might be in more than one language other than English. However, in the event that some dispute arises with respect to the meaning of any word, clause, sentence or any term contained in the terms of use due to different versions of the agreement based on different languages, the version of the terms of use written and provided on VRDa1 website shall prevail in all matters related to the terms of use between the parties.
                                </p>
                                <p>
                                    <strong>34)</strong> Counterparts: These terms, the terms of use offered by VRDa1 and agreed upon by the customers, may be executed in multiple counterparts, including electronically, where each of the counterparts shall be deemed to be the original set of the terms but all the executed counterparts shall constitute one and the same instrument. The terms of use may be delivered through email, and where the terms of use have been delivered through email, the email copies of executed signature pages shall be binding as originals.
                                </p>
                                <p>
                                    <strong>35)</strong> Disclaimer: We make every possible effort to ensure that we accurately represent our products and/or services and their potential for income. Income and earning statements made by VRDa1 and its customers are only estimates of what you can possibly earn. By agreeing to these terms of use, the customers understand and acknowledge that VRDa1 is only a provider of market and/or financial information. However, VRDa1 does not guarantee the accuracy, reliability, and usefulness of the said information. The customers also understand and acknowledge that market and/or financial information or any other piece of information provided by VRDa1 might not be appropriate for all customers and may result in a significant loss or additional liabilities. It is strongly advised that customers exercise due diligence before acting upon any market and/or financial information or any other piece of information provided by VRDa1 and are encouraged to take financial and legal or any other necessary support before basing their decisions on the information provided by VRDa1.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

`
    };
    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView>
                <View style={{margin:20}}>
            <RenderHtml
                contentWidth={width}
                source={source}
            />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default TermsAndCondition;
