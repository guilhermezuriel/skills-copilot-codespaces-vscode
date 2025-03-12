function skillsMember() {
    var member = document.getElementById("member");
    var memberData = [];
    var memberData = member.value.split(",");
    var memberData = memberData.map(function (x) { return x.trim(); });
    var memberSkills = [];
    var memberSkills = memberData.map(function (x) { return x.split(":"); });
    var memberSkills = memberSkills.map(function (x) {
        return {
            name: x[0],
            skills: x[1].split(";").map(function (y) { return y.trim(); })
        };
    });
    return memberSkills;
}