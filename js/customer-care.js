// Customer Care Pages JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion Functionality
    initFAQAccordion();
});

function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class on question
            this.classList.toggle('active');
            
            // Get the answer element
            const answer = this.nextElementSibling;
            
            // Toggle active class on answer
            if (answer && answer.classList.contains('faq-answer')) {
                answer.classList.toggle('active');
            }
            
            // Optional: Close other open FAQs (accordion behavior)
            // Comment out the lines below if you want multiple FAQs open at once
            /*
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this && otherQuestion.classList.contains('active')) {
                    otherQuestion.classList.remove('active');
                    const otherAnswer = otherQuestion.nextElementSibling;
                    if (otherAnswer && otherAnswer.classList.contains('faq-answer')) {
                        otherAnswer.classList.remove('active');
                    }
                }
            });
            */
        });
    });
}
