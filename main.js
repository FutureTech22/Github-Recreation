jQuery(function() {

    $.ajax({
        url: `https://api.github.com/users/futuretech22/events`,
        success: function(response) {
            console.log("events",response);

            response.forEach(function(events) {
                if(events.type==='PushEvent')
                {
                $('#events').append(`
					<div class='events'>
                    <p id='created_at'>${events.created_at}</p>
                    <br>
					<p id='login'>${events.actor.login} pushed to</p>
                    <p id='ref'>${events.payload.ref} at</p>
                    <p id='reponame'>${events.repo.name}</p>
                    <br>
                    <p id='sha'>${events.payload.commits[0].sha}</p>
                    <p id='commits'>${events.payload.commits[0].message}</p>
					</div>`)
                }
            })
        }
    });
    $.ajax({
        url: `https://api.github.com/users/futuretech22/repos`,
        success: function(response) {
            console.log(response);

            response.forEach(function(repos) {
                $('#repos').append(`
                    <div class='repos'>
                    <h3 id='name'>${repos.full_name}</h3>
                    <h6 id='forks'><i class="fa fa-code-fork" aria-hidden="true"></i>${repos.forks_count}</h6>
                    <h6 id='stargazers'><i class="fa fa-star" aria-hidden="true"></i>${repos.stargazers_count}</h6>
                    <h6 id='language'>${repos.language}</h6>
                    <h4 id='time'>updated ${moment(repos.created_at).fromNow()}</h4>
                    </div>`)

            })
        }
    });

    $.ajax({
        url: `https://api.github.com/users/futuretech22`,
        success: function(response) {
            console.log(response);

            $('#profilePic').attr('src',response.avatar_url);
            $("#name").html(response.name);
            $(".login").html(response.login);
            $('#company').html(response.company);
            $('#location').html(response.location);
            $('#followersNum').html(response.followers);
            $('#starsNum').html(response.starred);
            $('#followingNum').html(response.following);
            var createdAt = moment(response.created_at).fromNow();
            console.log(createdAt);
            $('#dateCreated').html(createdAt);
            $('#time').html(createdAt);
        },
        error: function(response) {
            console.log(response);
        }
    });
})
