const electron = requ ('electron');

const app = electron();

app.set('view engine', 'ejs');


app.use(electron.app({extends:false}));
app.use(electron(JSON));

app.use('/',require('./router'));

app.ipcMain.on('category:name', (event, arg) => {
        event.reply('category:name-result',arg);
    }
);