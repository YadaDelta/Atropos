var Narrative = pc.createScript('narrative');

// initialize code called once per entity
Narrative.prototype.initialize = function() {
    this.hasCross = false;
    this.hasDiary = false;
    this.hasAmulet = false;

    this.status = 'start0';
    this.advanceLine();
    this.canAdvance = true;
    this.entity.on('Advance', this.progress, this);
    this.entity.on('SwitchOnNarrative', this.switchOn, this);
    this.entity.on('GetEquip', this.getEquip, this);
    this.app.root.findByName("Character Controller").fire("SwitchMode");
};

// update code called every frame
Narrative.prototype.update = function(dt) {
    var app = this.app;

    if(app.keyboard.wasPressed(pc.KEY_Q)) {
        if (this.canAdvance === true) {
            this.advanceLine();
        }
    }
    // console.log(this.hasAmulet, this.hasCross, this.hasDiary);
};

Narrative.prototype.progress = function(step, allowAdvance = false) {
    this.status = step;
    this.canAdvance = allowAdvance;
    this.advanceLine();
    this.switchOn();
}

Narrative.prototype.advanceLine = function() {
    switch(this.status) {
        case('start0'):
        this.app.root.findByName("SpeakerName").element.text = '';
        this.entity.element.text = 'Приехав в странную коммунальную квартиру из-за низкой аренды, \nДима осознал, что это его единственный вариант.';
        this.status = 'start1';
        break;

        case('start1'):
        this.app.root.findByName("SpeakerName").element.text = '';
        this.entity.element.text = 'Бабушка Нина всегда шептала о "темных силах", \nВитя пах спиртом, \nа Оля скрывалась в тени, избегая контакта с миром.';
        this.status = 'start2';
        break;

        case('start2'):
        this.app.root.findByName("SpeakerName").element.text = '';
        this.entity.element.text = 'Мучительные кошмары овладели Димой, \nзаставляя его обращаться к соседям в поисках ответов...';
        this.status = 0;
        break;

        case('end1'):
        this.app.root.findByName("SpeakerName").element.text = '';
        this.entity.element.text = 'Ступив на путь борьбы с темными силами, \nДима нашел в себе силы и мудрость, чтобы одолеть свои страхи \nи освободиться от кошмаров.';
        this.status = 'end2';
        break;

        case('end2'):
        this.app.root.findByName("SpeakerName").element.text = '';
        this.entity.element.text = 'to be continued...';
        this.status = 'final';
        break;

        case('end3'):
        this.app.root.findByName("SpeakerName").element.text = '';
        this.entity.element.text = 'Поглощенный кошмарами и страхами, \nДима потерял рассудок, оставшись вечно пленником своих собственных ужасов.';
        this.status = 'end4';
        break;

        case('end4'):
        this.app.root.findByName("SpeakerName").element.text = '';
        this.entity.element.text = 'Однажды его тень исчезла из коммунальной квартиры, \nно легенда о безумце до сих пор живет среди новых жильцов, \nнапоминая им о том, что скрывается за закрытой дверью...';
        this.status = 'end5';
        break;

        case('end5'):
        this.app.root.findByName("SpeakerName").element.text = '';
        this.entity.element.text = 'to be continued...';
        this.status = 'final';
        break;

        case('final'):
        this.app.root.findByName("FinalCard").enabled = true;
        this.status = 'final2';
        break;

        case('final2'):
        this.app.root.findByName("FinalCard").enabled = false;
        this.canAdvance = false;
        this.switchOff();
        break;

        case(null):
        this.app.root.findByName("SpeakerName").element.text = 'Дима';
        this.canAdvance = false;
        this.switchOff();
        break;

        case(0):
        this.app.root.findByName("SpeakerName").element.text = 'Дима';
        this.entity.element.text = 'Ух, какой кошмар мне приснился.';
        this.status += 1;
        break;

        case(1):
        this.app.root.findByName("SpeakerName").element.text = 'Дима';
        this.entity.element.text = 'Надо бы пойти поесть.';
        this.status = null;
        break;

        case(3):
        this.app.root.findByName("SpeakerName").element.text = 'Дима';
        this.entity.element.text = 'Ммм, еда...';
        this.status = null;
        break;

        case(4):
        this.app.root.findByName("SpeakerName").element.text = '*Непонятные звуки*';
        this.entity.element.text = '%*№%№%!!!';
        this.status += 1;
        break;

        case(5):
        this.app.root.findByName("SpeakerName").element.text = 'Дима';
        this.entity.element.text = '...? Наверное показалось...';
        this.status += 1;
        break;

        case(6):
        this.app.root.findByName("SpeakerName").element.text = 'Дима';
        this.entity.element.text = 'Думаю нужно поговорить. с соседями.';
        this.status = null;
        break;

        case(103):
        this.app.root.findByName("SpeakerName").element.text = 'Дима';
        this.entity.element.text = 'Витек, скажи, ты замечал что-нибудь странное?';
        this.status = 104;
        break;

        case(104):
        this.app.root.findByName("SpeakerName").element.text = 'Витек';
        this.entity.element.text = 'Дим, расскажу что хочешь, если водки принесешь.';
        this.status = null;
        break;

        case(113):
        this.app.root.findByName("SpeakerName").element.text = 'Витек';
        this.entity.element.text = 'Дима, то о чем ты спрашивал мне знакомо, но я слишком трезв, чтобы об этом говорить.';
        this.status += 1;
        break;
        
        case(114):
        this.app.root.findByName("SpeakerName").element.text = 'Дима';
        this.entity.element.text = 'Кажется я видел где-то еще бутылку.';
        this.status = null;
        break;

        case(123):
        this.app.root.findByName("SpeakerName").element.text = 'Витек';
        this.entity.element.text = 'Тут произошло загадочное убийство. Умер предыдущий жилец. \nОн постоянно говорил про какой-то амулет.';
        this.status += 1;
        break;

        case(124):
        this.app.root.findByName("SpeakerName").element.text = 'Дима';
        this.entity.element.text = 'Где может быть это амулет?';
        this.status += 1;
        break;

        case(125):
        this.app.root.findByName("SpeakerName").element.text = 'Витек';
        this.entity.element.text = 'Может еще бутылочка освежит мою память, \nно я бы на твовем месте не ввязывался в это.';
        this.status = null;
        break;

        case(133):
        this.app.root.findByName("SpeakerName").element.text = 'Витек';
        this.entity.element.text = 'В комнате рядом с твоей осталось много вещей от предыдущего жильца, \nвсе отстань, больше я ни слова не скажу.';
        this.status += 1;
        break;

        case(134):
        this.app.root.findByName("SpeakerName").element.text = 'Дима';
        this.entity.element.text = 'Спасибо.';
        this.status = null;
        break;

        case(143):
        this.app.root.findByName("SpeakerName").element.text = '';
        this.entity.element.text = 'Хм, надо еще водки.';
        this.status = null;
        break;

        case(153):
        this.app.root.findByName("SpeakerName").element.text = '';
        this.entity.element.text = '*Дима берет бутылку водки*';
        this.status = null;
        break;

        case(163):
        this.app.root.findByName("SpeakerName").element.text = '';
        this.entity.element.text = '*Дима берет амулет*';
        this.hasAmulet = true;
        this.status = null;
        break;

        case(203):
        this.app.root.findByName("SpeakerName").element.text = 'Дима';
        this.entity.element.text = 'Бабушка Нина, вы знаете, что за паронольмальщина творится здесь?';
        this.status += 1;
        break;

        case(204):
        this.app.root.findByName("SpeakerName").element.text = 'Нина';
        this.entity.element.text = 'Милочек, помоги мне постирать вещи и приготовить еду, \nвозможно я чем-то смогу тебе помочь взамен.';
        this.status = null;
        break;

        case(243):
        this.app.root.findByName("SpeakerName").element.text = '';
        this.entity.element.text = '*Дима стирает вещи*';
        this.status = null;
        break;

        case(253):
        this.app.root.findByName("SpeakerName").element.text = '';
        this.entity.element.text = '*Дима готовит еду*';
        this.status = null;
        break;

        case(263):
        this.app.root.findByName("SpeakerName").element.text = 'Нина';
        this.entity.element.text = 'Спасибо что помог, возьми крест на тумбе справа, \nон тебе пригодиться, сынок. \nТолько Бог сможет помочь в этой чертовщине.';
        this.status += 1;
        break;

        case(264):
        this.app.root.findByName("SpeakerName").element.text = 'Дима';
        this.entity.element.text = 'Спасибо, но чем он мне поможет?';
        this.status += 1;
        break;

        case(265):
        this.app.root.findByName("SpeakerName").element.text = 'Нина';
        this.entity.element.text = 'Поверь, он тебе пригодиться.';
        this.status = null;
        break;

        case(273):
        this.app.root.findByName("SpeakerName").element.text = '';
        this.entity.element.text = '*Дима берет крест*';
        this.hasCross = true;
        this.status = null;
        break;


        case(303):
        this.app.root.findByName("SpeakerName").element.text = 'Дима';
        this.entity.element.text = 'Оль, расскажи, что здесь творится, что за странные шорохи и явления?';
        this.status += 1;
        break;

        case(304):
        this.app.root.findByName("SpeakerName").element.text = 'Оля';
        this.entity.element.text = 'Я бы пообщалась, \nно неважно себя чувствую, помоги мне найти лекарства в моей комнате.';
        this.status = null;
        break;

        case(323):
        this.app.root.findByName("SpeakerName").element.text = 'Оля';
        this.entity.element.text = 'Ты нашёл не все лекарства.';
        this.status = null;
        break;

        case(333):
        this.app.root.findByName("SpeakerName").element.text = 'Оля';
        this.entity.element.text = 'Спасибо за лекарства, я храню дневник предыдущего жильца за статуей лошади. \nТам описываеся что-то очень страшное, \nно я надеюсь он тебе поможет и ты спасешь всех нас, \nмы очень напуганы.';
        this.status += 1;
        break;

        case(334):
        this.app.root.findByName("SpeakerName").element.text = 'Дима';
        this.entity.element.text = 'Спасибо. Я постараюсь, разгадать эту тайну.';
        this.status = null;
        break;

        case(353):
        this.app.root.findByName("SpeakerName").element.text = '';
        this.entity.element.text = '*Дима подобрал лекарство*';
        this.status = null;
        break;

        case(373):
        this.app.root.findByName("SpeakerName").element.text = '';
        this.entity.element.text = '*Дима подобрал дневник*';
        this.hasDiary = true;
        this.status = null;
        break;

        case(913):
        this.app.root.findByName("SpeakerName").element.text = '';
        this.entity.element.text = 'Перед тем как идти спать, лучше исследовать квартиру.';
        this.status = null;
        break;

        case(923):
        this.app.root.findByName("SpeakerName").element.text = '';
        if (this.hasAmulet && this.hasCross && this.hasDiary) {
            this.entity.element.text = 'Вы готовы.'
        } else {
            this.entity.element.text = 'Вы уверены что готовы встретиться лицом к лицу со своими кошмарами?';
        }
        this.status = null;
        break;

        case(1000):
        this.app.root.findByName("SpeakerName").element.text = '';
        this.entity.element.text = 'Вы засыпаете...';
        this.status = 2000;
        break;

        //АКТ 2
        case(2000):
        this.app.root.findByName("SpeakerName").element.text = '';
        if (this.hasDiary) {
            this.entity.element.text = 'Вы прочитали дневник, поэтому знаете что вам нужно сделать \nПрячьтесь от монстра в местах, которые подсвечены синим \nВам нужно изгнать всех сущностей чтобы победить'
            this.app.root.findByName("Diary_Image").enabled = false;
        } else {
            this.entity.element.text = 'Вы не понимаете где оказались (Возможно кто-то из соседей мог помочь)';
        }

        const entitiesToChange = this.app.root.findByTag("Act1Off");
        entitiesToChange.forEach((el) => el.fire("showEntityEvent"));

        const entitiesToChange2 = this.app.root.findByTag("Act2On");
        entitiesToChange2.forEach((el) => el.fire("showEntityEvent"));

        this.status = 2010;
        break;

        case(2010):
        if(this.hasAmulet){
            this.app.root.findByName("MainEnemy").fire("hasAmulet");
        }
        if(this.hasCross){
            this.app.root.findByName("MainEnemy").fire("hasCross");
        }
        if(this.hasAmulet && this.hasCross){
            this.entity.element.text = 'Нужно торопиться, монстр уже вышел на охоту (но он ослаблен)';
            this.app.root.findByName("Cross_Image").enabled = false;
        } else {
            this.entity.element.text = 'Нужно торопиться, монстр уже вышел на охоту';
        }
        this.app.root.findByName("SpeakerName").element.text = '';
        this.status = 2020; //2020 === начало игры + status null
        break;

        case(2020):
        this.app.root.findByName("MainEnemy").fire("startGame");
        this.canAdvance = false;
        this.switchOff();
        break;
    }
};

Narrative.prototype.switchOn = function() {
    this.app.root.findByName("Dialogue Screen").enabled = true;
    this.app.root.findByName("Character Controller").fire("SwitchMode");
}

Narrative.prototype.switchOff = function() {
    this.app.root.findByName("Dialogue Screen").enabled = false;
    this.app.root.findByName("Character Controller").fire("SwitchMode", 1);
}

Narrative.prototype.getEquip = function(equipName) {
    if(equipName === 'Cross') {
        this.hasCross = true;
    }
    if(equipName === 'Diary') {
        this.hasDiary = true;
    }
    if(equipName === 'Amulet') {
        this.hasAmulet = true;
    }
    console.log('test555')
}

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// Narrative.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/