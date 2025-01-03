// Initialize Supabase client
const supabase = supabase.createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.ANON_KEY);

// Show/hide forms
function showForm(formId) {
    // Hide all forms first
    document.getElementById('caregiver-form').classList.add('hidden');
    document.getElementById('recipient-form').classList.add('hidden');
    document.getElementById('survey-selector').classList.add('hidden');
    
    // Show selected form
    document.getElementById(formId).classList.remove('hidden');
}

// Form submission handlers
async function submitCaregiverForm(event) {
    event.preventDefault();
    
    try {
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        const { error } = await supabase
            .from('caregiver_responses')
            .insert([data]);
            
        if (error) throw error;
        
        alert('Chur! Thanks for your response!');
        event.target.reset();
        showForm('survey-selector');
    } catch (error) {
        console.error('Error:', error);
        alert('Oops! Something went wrong. Please try again.');
    }
}

async function submitRecipientForm(event) {
    event.preventDefault();
    
    try {
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        const { error } = await supabase
            .from('recipient_responses')
            .insert([data]);
            
        if (error) throw error;
        
        alert('Chur! Thanks for your response!');
        event.target.reset();
        showForm('survey-selector');
    } catch (error) {
        console.error('Error:', error);
        alert('Oops! Something went wrong. Please try again.');
    }
}

// Add event listener for partial funding details visibility
document.getElementById('funding_source').addEventListener('change', function(e) {
    const partialFundingDetails = document.getElementById('partial-funding-details');
    partialFundingDetails.style.display = e.target.value === 'partially_funded' ? 'block' : 'none';
});