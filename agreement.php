<!DOCTYPE html>
<html lang="en">
<head>
    <title>Affiliate Agreement</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>

<?php
$cdate = date('d');
$cmonth = date('m');
$cyear = date('Y');

?>

<style>

    .new_signup_condiv .new_signup_inpitdiv input[type="button"] {
        font-size: 16px;
        color: #fff;
        text-transform: capitalize;
        font-family: 'open_sansregular';
        background: #1a77bc!important;
        border: none!important;
        border-radius: 0px!important;
        box-shadow: none!important;
        padding: 6px 32px 6px 10px !important;
        text-shadow: 0 0 14px #1a77bc;
        text-align: left!important;
        margin: 0px 5px!important;
    }
    .ep_contractbtn {
        background: #1a77bc!important;
        display: block!important;
        border: solid 1px #1a77bc!important;
        border-radius: 4px!important;
        width: 160px!important;
        margin: 0 auto!important;
        margin-bottom: 15px!important;
        padding: 10px 0!important;
        font-size: 18px!important;
        color: #fff;
        text-transform: uppercase!important;
        font-family: 'OpenSans-Semibold'!important;
    }
    button, input, select, textarea {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
    }
    input {
        line-height: normal;
    }
    button, input, optgroup, select, textarea {
        margin: 0;
        font: inherit;
        color: inherit;
    }
    .pop_btn_drapper .popbtn1 {
        background: #1a77bc;
        border: none;
        color: #fff;
        font-size: 16px;
        font-family: 'MyriadPro-Regular' !important;
        box-shadow: none;
    }
    .pop_btn_drapper .popbtn2 {
        background: #333;
        border: none;
        color: #fff;
        font-size: 16px;
        font-family: 'MyriadPro-Regular' !important;
        box-shadow: none;
    }
    @font-face {
        font-family: 'notera_personal_use_onlyRg';

        src: url('./fonts/notera_personaluseonly-webfont.woff2') format('woff2'),

        url('./fonts/notera_personaluseonly-webfont.woff') format('woff');
        font-weight: normal;
        font-style: normal;

    }
    .popsigndiv h3,.new_signup_inpitdiv {
        margin: 0;
        padding: 5px 0 5px 20px;
        font-size: 45px;
        color: #000;
        border-left: solid 1px #1a77bc;
        font-family: 'notera_personal_use_onlyRg'!important;
    }

</style>

<script>

    $(function(){
        $('#salesrepname').blur(function(){
            var salesrepname = $(this).val();
            $('#repname').text(salesrepname);
        });

        $('#signherebtn').click(function(){
            $('#digSigModal').find('.modal-body').find('#fullname').val($('#salesrepname').val());
            $('#digSigModal').find('.modal-body').find('#fullnamesignature').text($('#salesrepname').val());
            $('#digSigModal').modal('show');
        });

        $('#digSigModal').find('.modal-body').find('#fullname').keyup(function(){
            $('#digSigModal').find('.modal-body').find('#fullnamesignature').text($(this).val());
        });

        $('#agreebtn').click(function(){
            $('#signature').val($('#digSigModal').find('.modal-body').find('#fullname').val());
            $('#signaturearea').text($('#digSigModal').find('.modal-body').find('#fullname').val());
        });


    });

</script>

<div class="container">

<form action="https://audiodeadline.com/#/login" method="post">

    <input type="hidden" name="signature" id="signature" value="<?php echo $signature;?>" />

    <div class="pdf_wrapper page1pdf" style="padding-bottom: 40px;">

        <h2 style="padding-bottom: 28px; text-decoration: underline;">This agreement date of execution is : <?php echo $cdate;?>/<?php echo $cmonth;?>/<?php echo $cyear;?></h2>

        <div class="pdf_page1_block1" style="text-align: left;">

            <br/>
            This Affiliate Agreement ("Agreement") contains the complete terms and conditions between Audio Deadline Corp ("Company") and <span style="text-decoration: underline;font-size: larger"><?php echo $_REQUEST['name']; ?></span>, who wishes to participate in the Audio Deadline Affiliate Program (the “Affiliate Program”) as an affiliate of Audio Deadline Corp (an “Affiliate”). Both Company and Affiliate may collectively be referred to as (“Parties”).
        </div>


        <h3> DEFINITIONS </h3>


        <div class="pdf_page1_block1" style="text-align: left;">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Affiliate" - The business, individual, or entity applying to or participating in the Affiliate Program, or that displays Audio Deadline’s products and Services and/or promotions on its website, or other means, using an affiliate tracking code in exchange for receiving a commission from Company for sales directly resulting from such display.
            <br/>
            <br/>
            "Company’s Products and Services" – digital online community portal focused on live broadcasting services to fans, clothing, and other future opportunities presented by the company.
        </div>
        <br/>
        <br/>






        <h3> AFFILIATE RELATIONSHIP
        </h3>


        <div class="pdf_page1_block1" style="text-align: left;">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Parties acknowledge that Affiliate will perform their obligations hereunder as an independent contractor or Affiliate and shall not be an employee of Company.  It is also expressly understood that Affiliate's employees and agents, if any, are not Company's employees or agents, and have no authority to bind Company by contract or otherwise.
            <br/>
            <br/>
            Affiliate agrees they are solely responsible for understanding their rights and obligations as an Affiliate in their geographic area.
            <br/>
            <br/>
            Company shall not be liable for taxes, worker's compensation, unemployment insurance, employers' liability, employer's FICA, social security, withholding tax, or other taxes or withholding for or on behalf of Affiliate or any other person consulted or employed by the Affiliate in performing Services under this Agreement. All such costs shall be Affiliate's responsibility.
            <br/>
            <br/>
        </div>


        <h3> COMPENSATION</h3>
        <div class="pdf_page1_block1" style="text-align: left;">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Affiliate will receive 10% commissions from any products or services sold to their fans/reach/clients on the Company’s platform.
            <br/>
            <br/>
            Affiliate will get 5% commissions from any products or services sold by any individual that signs up officially through the affiliate’s links if they decided to also join as an affiliate of the company.
            <br/>
            <br/>
            Commissions, as described above, will commence for the lifetime purchase of the fan/reach/client.

<br/>

        </div>


        <h3> COMMISSION PAYMENTS
        </h3>

        <div class="pdf_page1_block1" style="text-align: left;">
            All commissions accumulated over the amount of $150 are paid out monthly. Commission amounts must be at least $150 USD at the end of the month to be paid out that following month.
            <br/>
            <br/>
            Affiliate shall provide Company with a w9 form before commissions are paid to affiliate. Affiliate is responsible to providing Company with up-to-date w9 form. Company may provide this digitally or affiliate may be responsible for scanning and sending before first payment is made.
            <br/>


        </div>
        <h3>REPORTS OF QUALIFIED PURCHASES</h3>

        <div class="pdf_page1_block1" style="text-align: left;">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Starting before the month of November 2018, you may log into your affiliate console to review your click through and potential Qualified Purchases statistics daily. The potential Qualified Purchases shown in this report have not been reviewed to confirm they meet all criteria for Qualified Purchases. As such, Commission Fees may not be issued for all Referred Customers that appear in the affiliate console.


        </div>


        <h3>FTC ENDORSEMENT COMPLIANCE
        </h3>

        <div class="pdf_page1_block1" style="text-align: left;">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is the intent of Company to treat all of our customers fairly. Accordingly, we require all Company Affiliates to comply with applicable laws, regulations and guidelines concerning advertising and marketing, including without limitation, the Federal Trade Commission (FTC) Endorsement Guides, which require that material connections between advertisers and endorsers be disclosed. This means that all Affiliate Sites (e.g. directories, review/rating websites, blogs, and other websites) and any email or collateral that provide an endorsement or assessment of Audio Deadline’s Products and Services must prominently disclose the fact that you receive compensation.
            <br/>
            <br/>
            Company reserves the right to withhold Commission Fees and cancel the affiliate relationship with you should we determine, at our sole discretion, that you are not in compliance with the previously mentioned guide or other FTC regulations or guides that we deem relevant.


        </div>

        <h3>NON­DISCLOSURE</h3>

        <div class="pdf_page1_block1" style="text-align: left;">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Affiliate agrees to not disclose any of the details in this agreement either implicitly, explicitly, or indirectly to any competing entity, employee of Company or subsidiary, contractor of Company or subsidiary, and client of Company or subsidiary without permission explicitly given by Company. The Affiliate agrees not to disclose details of compensation with any entity without the explicit permission of Company.
            <br/>
            <br/>
            Affiliate agrees not to disclose or otherwise reveal to any third party the identities, addresses, telephone numbers, facsimile numbers, email address, telex numbers, bank codes, account number, financial reference, or any other entities introduces by Company to the Affiliate without the specific written permission of Company.
            <br/>
            <br/>
            Confidential Information.  The Affiliate agrees that they shall not, directly or indirectly, disclose, disseminate, use for personal benefit, lecture or write articles with respect to, or otherwise publish “confidential information”.  For purposes of this Agreement, the term “confidential information” means information and know­how disclosed to or known by the Affiliate which relates to the Company or any business idea under development or research by the Company or that constitutes a corporate opportunity of the Company and which information is not generally known in the relevant trade or industry, including without limitation, any document, information, website or other data requiring pass code or password access, trade secrets, proprietary data, customer lists, contractual arrangements, and product and service development.  “Confidential information” shall also include any other document or information (whether of the Company or of any supplier or customer of the Company or of any other person with which the Company has an agreement with respect to the confidentiality of information) labeled “confidential”, “proprietary”, or words of similar import.  Upon Termination of the Term hereof, the Affiliate shall return to or leave with the Company, without making or retaining copies thereof, all documents, records, notebooks and similar repositories containing “confidential information”.
<br/>

        </div>





        <h3 style="line-height: 24px;">INDEMNIFICATION</h3>


        <div class="pdf_page1_block1" style="text-align: left;">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Affiliate shall not be liable for any claim or demand made against Company by any third party.  Company shall indemnify Affiliate against all claims, liabilities and costs, including reasonable attorney fees, of defending any third-party claim or suit arising out of the use of the software provided under this agreement. However, the Affiliate hereby agrees to indemnify and hold Company harmless from all liability, damage, loss, cost, expense or other charge resulting directly or indirectly from any act or omission of the Affiliate.  It is understood that Affiliate is to use and only use the regulated media for promotion of any sign ups or sales and the Company is not liable for what the affiliate may present outside of these materials. These materials are all available of the website and through the affiliate back office.

        </div>






        <h3>STANDARDS AND ETHICS
        </h3>

        <div class="pdf_page1_block1" style="text-align: left;">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Affiliate will adhere to truth and integrity and will not engage in any deceptive or misleading sales practices.
            <br/>
            <br/>
            Affiliate will not in any way demean or speak negatively of Company, Company's Clients, Company's Potential Clients, Any member of Company, Company's Competition, or Affiliate's Competition.
            <br/>
            <br/>
            Affiliate will maintain the confidentially of information provided by any prospect or client of Company and will not reveal any such information without the proper consent or exemption of Company.
<br/>


        </div>


        <h3>GOVERNING LAW AND FORUM
        </h3>


        <div class="pdf_page1_block1" style="text-align: left;">
            This Agreement shall be governed, construed and enforced exclusively in accordance with the laws of the State of Idaho and the laws of the United States of America, without regard to choice of laws or conflict of law provisions thereof that would result in the application of the laws of a different jurisdiction. Any arbitration or litigation between the Parties shall be conducted exclusively in Idaho, and the Parties hereby submit to such exclusive jurisdiction and venue and agree that venue shall be proper in Idaho. Each Party hereby irrevocably waives, to the fullest extent permitted by law, any objection that it may have, whether now or in the future, to the laying of venue in, or to the jurisdiction of, any and each of such courts for the purpose of any such suit, action, proceeding or judgment and further waives any claim that any such suit, action proceeding or judgment has been brought in an inconvenient forum, and each Party hereby submits to such jurisdiction.

        </div>
        <h3>X. NOTICES</h3>


        <div class="pdf_page1_block1" style="text-align: left;">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Any notice required or permitted to be given under this Agreement shall be sufficient if it
            is in writing and if it is sent by registered mail or certified mail, return receipt requested, to the
            Employee at his or her residence affixed above, or to the Employer’s principal place of business
            as affixed above.

        </div>


        <h3>ENTIRE AGREEMENT
        </h3>


        <div class="pdf_page1_block1" style="text-align: left;">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This agreement contains the entire understanding of the Parties and supersedes any and all previous verbal and written agreement or understandings. There are no other agreements, representations or warranties not set forth in this agreement. This agreement will bind, and inure to the benefit of, the Parties and their respective successor and assigns. Any modification, amendment, or waiver of any provision of this agreement may be made only in writing and signed by both Parties. The failure by any party to exercise any rights granted herein upon the occurrence of any event set forth in this agreement shall not constitute a waiver of any such rights upon the occurrence of any such event. In the event any provision of this agreement is held to be in violation of any law, statue, regulation, ordinance, or court order, this agreement shall be deemed modified accordingly and to the extent necessary to comply therewith and shall otherwise continue full force and effect.


        </div>


        <h3>AGREEMENT EXECUTION</h3>

        <div class="pdf_page1_block1" style="text-align: left;">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This digital signature constitutes the full legal agreement between company and affiliate. This agreement may be executed in several counterparts, each of which shall constitute one and the same instrument.  Section or paragraph headings in the agreement are for convenience of reference only.
            <br/>
            In witness whereof, the Parties hereto have caused this Agreement to be duly executed and entered into as of the date first above written.


        </div>





        <div class="pdf_page1_signblock">

            <h2 class="hide">EMPLOYER</h2>
            <h3>Audio Deadline Corp</h3>

            <span class="hide">/s/</span><input type="text" class="page1_signinput hide">

            <h4>By:Beto Paredes


            </h4>
            <h4>Its:Chief Executive Officer</h4>

        </div>

        <div class="clearfix"></div>

        <div class="pdf_page1_signblock">

            <h2>Affiliate</h2>
            <h3>&nbsp;</h3>

            <!--        <span>/s/</span><input type="text" class="page1_signinput inputbgcon" name="signature" placeholder="Sign Here"  value="<?php /*echo $signature;*/?>">
-->
            <div class="new_signup_condiv">
                <span class="hide">/s/</span>


                <div class="new_signup_inpitdiv" style="height: 70px;">

                    <div class="new_signupdiv"> <input type="button" value="Sign Here" id="signherebtn"></div>
                    <label id="signaturearea"><?php echo $signature;?></label>
                </div>

                <div class="clearfix"></div>


            </div>


            <h4>By: <span id="repname"><?php echo $salesrepname;?></span></h4>


        </div>

        <div class="clearfix"></div>

    </div>

    <div class="pdf_wrapper page1pdf" style="padding-bottom: 40px;display: none">

        <h2 style=" padding: 20px 0;">EXHIBIT "A"</h2>
        <h2 style="padding:0; padding-bottom: 20px; font-weight: normal; text-decoration: underline;">COMPENSATION</h2>

        <div class="pdf_page1_block1" style="text-align: left;">
            During the Part-Time Employment Term: </div>


        <div class="pdf_page1_block1" style="text-align: left;">
            <ol style="padding-left: 60px;">

                <!-- <li style="list-style-type: lower-roman; padding-bottom: 20px;">Employee shall be compensated at a rate equal to $ <input type="text" name=" compensation_modifiers_prosp" value="<?php /*echo @$compensation_modifiers_prosp */?>" readonly="readonly" class="p1_b1_input2n"/>  per TC as Prospector Rep</li>-->

                <li style="list-style-type: lower-roman; padding-bottom: 20px;">Employee shall be compensated at a rate equal to:<br> (a)&nbsp;&nbsp;&nbsp;$<input type="text" name="compansationrate" value="<?php echo @$compensation_modifiers_closer ?>" readonly="readonly" class="p1_b1_input2n" style="border: none;  min-width: 8px;
    max-width: 15px; padding: 0px; "/>per TC , resulting from Employee’s direct efforts as defined herein.<br>(b)&nbsp;&nbsp;&nbsp;$500 per device placed in a medical facility, resulting from Employee’s direct efforts as defined herein.</li>
                <!-- <li style="list-style-type: lower-roman; padding-bottom: 20px;">

                     Compensation shall become due from, and be payable by, Employer <i>only</i> upon
                     <br/> <br/>
                     (a)&nbsp;&nbsp;&nbsp;Employer’s compensation greater than $100 for its technical component
                     connected to an ANS test (“TC”);<br/> <br/>
                     (b)&nbsp;&nbsp;&nbsp;TC generated as a direct result of the Employee’s placement of the ANS
                     device;<br/> <br/>
                     (c)&nbsp;&nbsp;&nbsp;On the 5<sup>th</sup> day of each month following the Employer’s receipt of the TC during the prior month.


                 </li>

                 <li style="list-style-type: lower-roman; padding-bottom: 20px;">(a) Employee shall be required to refund to Employer (or Employer may off-set) any
                     compensation paid to Employee for which reimbursement is later denied or recovered
                     by any insurance payor, and (b) Employer may reasonably adjust Employee’s
                     compensation upon any declining reimbursement rates.</li>

                 <li style="list-style-type: lower-roman; padding-bottom: 20px;">Employer shall provide Employee a monthly compensation report reflecting the TC generated by Employee, and associated details. </li>-->

            </ol>



        </div>

        <!--<div class="pdf_page1_block1" style="text-align: left;">
            EXHIBIT A shall <i>not</i> survive termination if Employee violated any federal or state law during
            the Part-Time Employment Term of this Agreement, or violates Section IX G and IX H.
            Notwithstanding the foregoing, section iii (a) and (b) of EXHIBIT A shall survive termination,
            irrespective of reason for termination.
            </div>-->

        <div class="pdf_page1_block1" style="text-align: left;">
            <!--EXHIBIT A shall <i>not</i> survive termination if Employee:<br><br>
            <ol style="padding-left: 16px; margin-bottom: 0px;">
                <li style="list-style-type:decimal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Violates any federal, state or local law connected to this Agreement, during the Part-Time Employment Term of this Agreement, or</li><br>
                <li style="list-style-type:decimal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Violates Section IX G and IX H of this Agreement, at anytime.</li><br>
            </ol>
            Notwithstanding the foregoing, section iii (a) and (b) of this EXHIBIT A shall survive termination, irrespective of reason for termination.-->
            <!-- EXHIBIT A shall <i>not</i> survive termination if Employee violated any federal or state law during the Part-Time Employment Term of this Agreement, or violates Section IX G and IX H. Notwithstanding the foregoing, section iii (a) and (b) of EXHIBIT A shall survive termination,irrespective of reason for termination.-->
        </div>

    </div>





    <input type="submit" value="Submit " class="ep_contractbtn">
</form>

</div>

<!-- Modal -->
<div id="digSigModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-body">



                <h4>Digital Signature</h4>



                <label>Full name</label> <input  type="text" id="fullname">


                <div class="popsigndiv">

                    <h2>Digitally Signed By:</h2>
                    <h3 id="fullnamesignature"> Sign Text Input</h3>
                    <h4><?php echo date('M d, Y h:ia')?></h4>

                </div>

                <h5>By selecting “agree”, the parties agree that this agreement may be electronically signed. The parties agree that the electronic signatures appearing on this agreement are the same as handwritten signatures for the purposes of validity, enforceability, and admissibility.
                </h5>

                <div class="pop_btn_drapper">

                    <button type="button" class="btn btn-default popbtn1" data-dismiss="modal" id="agreebtn">Agree</button>
                    <button type="button" class="btn btn-default popbtn2" data-dismiss="modal">Cancel</button>
                    <div class="clearfix"></div>
                </div>

            </div>




        </div>

    </div>
</div>

</body>
</html>