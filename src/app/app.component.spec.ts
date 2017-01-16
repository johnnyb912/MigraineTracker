import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';

// suite of related tests
describe('App Component', () => {
    let fixture : ComponentFixture<AppComponent>,
        comp    : AppComponent,
        element : any;

    // setup tasks to perform before each test
    beforeEach(() => {
        // refine the initial testing module configuration
        TestBed.configureTestingModule({
            imports         : [RouterTestingModule],
            declarations    : [AppComponent]
        });

        // create component fixture
        fixture = TestBed.createComponent(AppComponent);

        // grab instance of component class
        comp = fixture.componentInstance;

        // grab DOM representation
        element = fixture.nativeElement;
    });

    // test definitions
    it('should inject the component', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });
});
